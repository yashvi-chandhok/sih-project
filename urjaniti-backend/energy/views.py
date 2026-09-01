from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def home(request):
    return Response({
        "message": "URJA-NITI Backend Running",
        "status": "success"
    })


@api_view(['GET'])
def dashboard(request):
    return Response({
        "state": "Uttar Pradesh",
        "renewable_share": 42.5,
        "solar_generation": 1250,
        "wind_generation": 680,
        "total_generation": 1930,
        "demand": 1650,
        "surplus": 280
    })


@api_view(['POST'])
def prediction(request):

    data = request.data

    return Response({
        "status": "success",
        "message": "Prediction API ready",
        "prediction": 1250,
        "unit": "MW",
        "model": "CatBoost",
        "inputs": data,
        "note": "Demo prediction — model will be connected later"
    })

@api_view(['POST'])
def energy_mix(request):
    return Response({
        "solar": 45,
        "wind": 25,
        "biomass": 15,
        "hydro": 15
    })


@api_view(['POST'])
def simulation(request):
    generation = float(request.data.get("generation", 0))
    demand = float(request.data.get("demand", 0))

    difference = generation - demand

    if difference >= 0:
        return Response({
            "status": "SURPLUS",
            "amount": difference,
            "action": "Store surplus energy"
        })

    return Response({
        "status": "DEFICIT",
        "amount": abs(difference),
        "action": "Activate backup/flexible loads"
    })


@api_view(['POST'])
def disaster(request):
    event = request.data.get("event", "normal")

    return Response({
        "event": event,
        "status": "RESILIENT MODE",
        "priority": "Critical Loads",
        "action": "Isolate affected region and maintain essential supply"
    })