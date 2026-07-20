import pytest
from pricing_engine import BaseRateCatalog, Region, RateEstimate
from vision_to_sow import VisionToSOWProcessor, FieldObservation, ScopeCategory, StatementOfWork

def test_pricing_engine_ypsilanti():
    catalog = BaseRateCatalog(Region.YPSILANTI)
    estimate = catalog.get_estimate("structural_framing", quantity=10)

    assert estimate.region == Region.YPSILANTI
    assert estimate.unit_cost == 95.00
    assert estimate.labor_hours == 25.0  # 10 * 2.5
    assert estimate.material_cost == 10 * 95.00 * 1.28

def test_pricing_engine_flint():
    catalog = BaseRateCatalog(Region.FLINT)
    estimate = catalog.get_estimate("structural_framing", quantity=5)

    assert estimate.region == Region.FLINT
    assert estimate.unit_cost == 88.00
    assert estimate.labor_hours == 11.5  # 5 * 2.3
    assert estimate.material_cost == 5 * 88.00 * 1.24

def test_vision_to_sow_generation():
    processor = VisionToSOWProcessor()

    obs1 = FieldObservation(
        timestamp="2026-07-20T12:00:00",
        location="Sector 5 Ingress",
        category=ScopeCategory.STRUCTURAL_FRAMING,
        description="Damaged wall framing needs reinforcement",
        severity="high"
    )
    processor.add_observation(obs1)

    sow = processor.generate_sow(
        sow_id="SOW-TEST-101",
        project_name="Sector 5 Rehab",
        project_address="123 McKean Rd",
        client_name="Multi-Dash Properties"
    )

    assert sow.sow_id == "SOW-TEST-101"
    assert sow.project_name == "Sector 5 Rehab"
    assert len(sow.scope_items) == 1
    assert sow.scope_items[0].category == ScopeCategory.STRUCTURAL_FRAMING
    assert sow.vro_split_percentage == 0.10
