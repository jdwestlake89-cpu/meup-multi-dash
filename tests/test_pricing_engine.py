import pytest
from agents.pricing_engine import BaseRateCatalog, Region, RateEstimate


def test_pricing_engine_default_region():
    catalog = BaseRateCatalog(region=Region.YPSILANTI)
    estimate = catalog.get_estimate("structural_framing", quantity=2.0)

    assert estimate.region == Region.YPSILANTI
    assert estimate.labor_hours == 5.0  # 2.0 * 2.5
    assert estimate.unit_cost == 95.00
    assert estimate.material_cost == pytest.approx((2.0 * 95.00) * 1.28)


def test_pricing_engine_washtenaw_region():
    catalog = BaseRateCatalog(region=Region.WASHTENAW)
    estimate = catalog.get_estimate("structural_framing", quantity=1.0)

    assert estimate.region == Region.WASHTENAW
    assert estimate.unit_cost == 92.00
    assert estimate.labor_hours == 2.4


def test_pricing_engine_flint_region():
    catalog = BaseRateCatalog(region=Region.FLINT)
    estimate = catalog.get_estimate("finishes", quantity=10.0)

    assert estimate.region == Region.FLINT
    assert estimate.unit_cost == 58.00
    assert estimate.labor_hours == 13.0
    assert estimate.material_cost == pytest.approx((10.0 * 58.00) * 1.06)


def test_pricing_engine_api_override():
    catalog = BaseRateCatalog(region=Region.YPSILANTI)
    catalog.set_api_override("custom_task", {
        "unit_cost": 200.00,
        "material_multiplier": 1.5,
        "labor_hours_per_unit": 4.0
    })
    estimate = catalog.get_estimate("custom_task", quantity=3.0)

    assert estimate.unit_cost == 200.00
    assert estimate.labor_hours == 12.0
    assert estimate.material_cost == pytest.approx((3.0 * 200.00) * 1.5)


def test_export_current_rates():
    catalog = BaseRateCatalog(region=Region.YPSILANTI)
    exported = catalog.export_current_rates()
    assert exported["region"] == "ypsilanti"
    assert "structural_framing" in exported["base_rates"]
