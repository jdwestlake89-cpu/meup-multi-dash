"""
Vision-to-SOW Module
Converts field data/images into structured Statements of Work (SOWs).

Trigger: Form Input
Status: Live
"""

import json
from datetime import datetime
from typing import Dict, List, Any, Optional
from dataclasses import dataclass, asdict
from enum import Enum


class ScopeCategory(Enum):
    """NCCER Framing / OSHA 30 scope categories."""
    STRUCTURAL_FRAMING = "structural_framing"
    ROOF_SYSTEM = "roof_system"
    EXTERIOR_ENVELOPE = "exterior_envelope"
    INTERIOR_SYSTEMS = "interior_systems"
    FINISHES = "finishes"
    COMPLIANCE_REMEDIATION = "compliance_remediation"


@dataclass
class FieldObservation:
    """Represents a single field observation from images/forms."""
    timestamp: str
    location: str
    category: ScopeCategory
    description: str
    image_url: Optional[str] = None
    notes: Optional[str] = None
    severity: Optional[str] = None  # critical, high, medium, low


@dataclass
class ScopeLineItem:
    """Individual line item in SOW."""
    line_number: int
    category: ScopeCategory
    description: str
    unit_of_measure: str
    quantity: float
    unit_cost: float
    labor_hours: float
    material_cost: float
    is_compliance_item: bool = False
    
    @property
    def line_total(self) -> float:
        return (self.quantity * self.unit_cost) + self.material_cost


@dataclass
class StatementOfWork:
    """Complete SOW object."""
    sow_id: str
    created_at: str
    project_name: str
    project_address: str
    client_name: str
    scope_items: List[ScopeLineItem]
    notes: str
    total_labor_hours: float
    total_material_cost: float
    vro_split_percentage: float = 0.10
    
    @property
    def subtotal(self) -> float:
        return sum(item.line_total for item in self.scope_items)
    
    @property
    def vro_amount(self) -> float:
        return self.subtotal * self.vro_split_percentage
    
    @property
    def contractor_amount(self) -> float:
        return self.subtotal - self.vro_amount
    
    def to_dict(self) -> Dict[str, Any]:
        return {
            "sow_id": self.sow_id,
            "created_at": self.created_at,
            "project_name": self.project_name,
            "project_address": self.project_address,
            "client_name": self.client_name,
            "scope_items": [asdict(item) for item in self.scope_items],
            "notes": self.notes,
            "total_labor_hours": self.total_labor_hours,
            "total_material_cost": self.total_material_cost,
            "subtotal": self.subtotal,
            "vro_split_percentage": self.vro_split_percentage,
            "vro_amount": self.vro_amount,
            "contractor_amount": self.contractor_amount,
        }


class VisionToSOWProcessor:
    """
    Core processor: converts field observations into structured SOWs.
    
    Workflow:
    1. Receive form input with images + field notes
    2. Parse observations
    3. Categorize by NCCER Framing scope
    4. Generate line items with labor/material estimates
    5. Calculate VRO split (10%)
    6. Output structured SOW
    """
    
    def __init__(self):
        self.observations: List[FieldObservation] = []
    
    def add_observation(self, observation: FieldObservation) -> None:
        """Add a field observation from form input."""
        self.observations.append(observation)
    
    def generate_sow(
        self,
        sow_id: str,
        project_name: str,
        project_address: str,
        client_name: str,
        notes: str = ""
    ) -> StatementOfWork:
        """
        Generate SOW from collected observations.
        
        Args:
            sow_id: Unique SOW identifier
            project_name: Project name
            project_address: Project location
            client_name: Client/property owner name
            notes: Additional SOW notes
        
        Returns:
            StatementOfWork object
        """
        scope_items = self._create_scope_items()
        total_labor = sum(item.labor_hours for item in scope_items)
        total_material = sum(item.material_cost for item in scope_items)
        
        sow = StatementOfWork(
            sow_id=sow_id,
            created_at=datetime.now().isoformat(),
            project_name=project_name,
            project_address=project_address,
            client_name=client_name,
            scope_items=scope_items,
            notes=notes,
            total_labor_hours=total_labor,
            total_material_cost=total_material,
        )
        
        return sow
    
    def _create_scope_items(self) -> List[ScopeLineItem]:
        """Convert observations into scope line items."""
        items: Dict[ScopeCategory, ScopeLineItem] = {}
        line_number = 1
        
        for obs in self.observations:
            if obs.category not in items:
                items[obs.category] = ScopeLineItem(
                    line_number=line_number,
                    category=obs.category,
                    description=obs.description,
                    unit_of_measure="per occurrence",
                    quantity=1,
                    unit_cost=0,  # To be populated by estimating logic
                    labor_hours=0,
                    material_cost=0,
                    is_compliance_item=(obs.severity in ["critical", "high"]),
                )
                line_number += 1
            else:
                items[obs.category].quantity += 1
        
        return list(items.values())


def format_sow_for_ledger(sow: StatementOfWork) -> Dict[str, Any]:
    """
    Format SOW for closed-loop ledger entry.
    Ensures forensic auditability.
    """
    return {
        "transaction_type": "scope_of_work_generated",
        "sow_id": sow.sow_id,
        "timestamp": sow.created_at,
        "project": {
            "name": sow.project_name,
            "address": sow.project_address,
            "client": sow.client_name,
        },
        "financial": {
            "subtotal": sow.subtotal,
            "vro_amount": sow.vro_amount,
            "contractor_amount": sow.contractor_amount,
        },
        "scope": {
            "total_items": len(sow.scope_items),
            "total_labor_hours": sow.total_labor_hours,
            "total_material_cost": sow.total_material_cost,
        },
        "audit_status": "logged",
    }
