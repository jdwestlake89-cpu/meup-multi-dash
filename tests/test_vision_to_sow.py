import pytest
from agents.vision_to_sow import (
    VisionToSOWProcessor,
    FieldObservation,
    ScopeCategory,
    StatementOfWork,
    ScopeLineItem,
    format_sow_for_ledger,
)


def test_vision_to_sow_processor():
    processor = VisionToSOWProcessor()

    obs1 = FieldObservation(
        timestamp="2026-06-16T12:00:00Z",
        location="Basement West Wall",
        category=ScopeCategory.STRUCTURAL_FRAMING,
        description="Basement framing layout with 2x4 studs",
        severity="high",
    )
    obs2 = FieldObservation(
        timestamp="2026-06-16T12:05:00Z",
        location="Basement Utility Area",
        category=ScopeCategory.INTERIOR_SYSTEMS,
        description="Electrical and plumbing rough-in",
        severity="medium",
    )

    processor.add_observation(obs1)
    processor.add_observation(obs2)

    sow = processor.generate_sow(
        sow_id="SOW-2026-001",
        project_name="Ypsilanti Basement Remodel",
        project_address="123 Main St, Ypsilanti, MI",
        client_name="Multi-Dash Client",
        notes="Full new construction basement remodel starting labor $8,000",
    )

    assert sow.sow_id == "SOW-2026-001"
    assert sow.project_name == "Ypsilanti Basement Remodel"
    assert len(sow.scope_items) == 2
    assert sow.vro_split_percentage == 0.10
    assert sow.vro_amount == pytest.approx(sow.subtotal * 0.10)
    assert sow.contractor_amount == pytest.approx(sow.subtotal * 0.90)


def test_format_sow_for_ledger():
    sow = StatementOfWork(
        sow_id="SOW-TEST-02",
        created_at="2026-06-16T12:00:00Z",
        project_name="Test Project",
        project_address="789 Oak Rd",
        client_name="Test Client",
        scope_items=[
            ScopeLineItem(
                line_number=1,
                category=ScopeCategory.STRUCTURAL_FRAMING,
                description="Framing",
                unit_of_measure="sqft",
                quantity=10,
                unit_cost=100.0,
                labor_hours=20.0,
                material_cost=200.0,
            )
        ],
        notes="Test SOW",
        total_labor_hours=20.0,
        total_material_cost=200.0,
    )

    ledger_entry = format_sow_for_ledger(sow)
    assert ledger_entry["transaction_type"] == "scope_of_work_generated"
    assert ledger_entry["sow_id"] == "SOW-TEST-02"
    assert ledger_entry["financial"]["subtotal"] == 1200.0
    assert ledger_entry["financial"]["vro_amount"] == 120.0
    assert ledger_entry["financial"]["contractor_amount"] == 1080.0
    assert ledger_entry["audit_status"] == "logged"
