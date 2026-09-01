from django.urls import path

from .views import (
    home,
    dashboard,
    prediction,
    energy_mix,
    simulation,
    disaster
)

urlpatterns = [
    path('', home),

    path('dashboard/', dashboard),
    path('prediction/', prediction),
    path('energy-mix/', energy_mix),
    path('simulation/', simulation),
    path('disaster/', disaster),
]