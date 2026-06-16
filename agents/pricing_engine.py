"""
Pricing Engine for Vision-to-SOW
Dynamic regional lookup system with market index integration.

Regions: Ypsilanti, Washtenaw County, Flint (NCCER Framing / OSHA 30)
"""

import json
from enum import Enum
from typing import Dict, Any, Optional
from dataclasses import dataclass


class Region(Enum):
    """Supported regions with wage/material baselines."""
    YPSILANTI = "ypsilanti"
    WASHTENAW = "washtenaw_county"
    FLINT = "flint"
    DEFAULT = "default"


@dataclass
class RateEstimate:
    """Rate estimate object from catalog."""
    unit_cost: float
    labor_hours: float
    material_cost: float
    material_multiplier: float
    region: Region


class BaseRateCatalog:
    """
    Lookup engine for labor/material costs.
    Regional awareness with API override capability.
    """
    
    # Regional baseline rates (NCCER Framing / OSHA 30)
    _REGIONAL_RATES = {
        Region.YPSILANTI: {
            "structural_framing": {
                "unit_cost": 95.00,
                "material_multiplier": 1.28,
                "labor_hours_per_unit": 2.5
            },
            "roof_system": {
                "unit_cost": 125.00,
                "material_multiplier": 1.35,
                "labor_hours_per_unit": 3.0
            },
            "exterior_envelope": {
                "unit_cost": 85.00,
                "material_multiplier": 1.20,
                "labor_hours_per_unit": 2.0
            },
            "interior_systems": {
                "unit_cost": 75.00,
                "material_multiplier": 1.15,
                "labor_hours_per_unit": 1.8
            },
            "finishes": {
                "unit_cost": 65.00,
                "material_multiplier": 1.10,
                "labor_hours_per_unit": 1.5
            },
            "compliance_remediation": {
                "unit_cost": 120.00,
                "material_multiplier": 1.40,
                "labor_hours_per_unit": 3.5
            }
        },
        Region.WASHTENAW: {
            "structural_framing": {
                "unit_cost": 92.00,
                "material_multiplier": 1.26,
                "labor_hours_per_unit": 2.4
            },
            "roof_system": {
                "unit_cost": 122.00,
                "material_multiplier": 1.33,
                "labor_hours_per_unit": 2.9
            },
            "exterior_envelope": {
                "unit_cost": 82.00,
                "material_multiplier": 1.18,
                "labor_hours_per_unit": 1.9
            },
            "interior_systems": {
                "unit_cost": 72.00,
                "material_multiplier": 1.13,
                "labor_hours_per_unit": 1.7
            },
            "finishes": {
                "unit_cost": 62.00,
                "material_multiplier": 1.08,
                "labor_hours_per_unit": 1.4
            },
            "compliance_remediation": {
                "unit_cost": 115.00,
                "material_multiplier": 1.38,
                "labor_hours_per_unit": 3.3
            }
        },
        Region.FLINT: {
            "structural_framing": {
                "unit_cost": 88.00,
                "material_multiplier": 1.24,
                "labor_hours_per_unit": 2.3
            },
            "roof_system": {
                "unit_cost": 118.00,
                "material_multiplier": 1.31,
                "labor_hours_per_unit": 2.8
            },
            "exterior_envelope": {
                "unit_cost": 78.00,
                "material_multiplier": 1.16,
                "labor_hours_per_unit": 1.8
            },
            "interior_systems": {
                "unit_cost": 68.00,
                "material_multiplier": 1.11,
                "labor_hours_per_unit": 1.6
            },
            "finishes": {
                "unit_cost": 58.00,
                "material_multiplier": 1.06,
                "labor_hours_per_unit": 1.3
            },
            "compliance_remediation": {
                "unit_cost": 110.00,
                "material_multiplier": 1.36,
                "labor_hours_per_unit": 3.2
            }
        }
    }
    
    def __init__(self, region: Region = Region.YPSILANTI):
        self.region = region
        self._api_overrides: Dict[str, Dict[str, float]] = {}
    
    def set_api_override(self, category_key: str, rates: Dict[str, float]) -> None:
        """Set API-sourced rate override for a category."""
        self._api_overrides[category_key] = rates
    
    def get_estimate(
        self,
        category_key: str,
        quantity: float = 1.0
    ) -> RateEstimate:
        """
        Fetch estimate from catalog.
        
        Args:
            category_key: str form of ScopeCategory (e.g., "structural_framing")
            quantity: Number of units
        
        Returns:
            RateEstimate object
        """
        # Check for API override first
        if category_key in self._api_overrides:
            rates = self._api_overrides[category_key]
        else:
            # Fall back to regional baseline
            regional_base = self._REGIONAL_RATES.get(self.region, {})
            rates = regional_base.get(
                category_key,
                self._REGIONAL_RATES[Region.YPSILANTI].get(
                    category_key,
                    {
                        "unit_cost": 50.00,
                        "material_multiplier": 1.10,
                        "labor_hours_per_unit": 2.0
                    }
                )
            )
        
        unit_cost = rates.get("unit_cost", 50.00)
        material_multiplier = rates.get("material_multiplier", 1.10)
        labor_hours_per_unit = rates.get("labor_hours_per_unit", 2.0)
        
        return RateEstimate(
            unit_cost=unit_cost,
            labor_hours=quantity * labor_hours_per_unit,
            material_cost=(quantity * unit_cost) * material_multiplier,
            material_multiplier=material_multiplier,
            region=self.region
        )
    
    def load_config_from_json(self, config_path: str) -> None:
        """Load regional rate config from JSON file."""
        try:
            with open(config_path, 'r') as f:
                config = json.load(f)
                # Merge custom config into regional rates
                for region_name, categories in config.items():
                    for cat_key, rates in categories.items():
                        self._api_overrides[cat_key] = rates
        except (FileNotFoundError, json.JSONDecodeError) as e:
            raise ValueError(f"Failed to load config: {e}")
    
    def export_current_rates(self) -> Dict[str, Any]:
        """Export current rates for audit trail."""
        return {
            "region": self.region.value,
            "base_rates": self._REGIONAL_RATES.get(self.region, {}),
            "api_overrides": self._api_overrides,
        }
