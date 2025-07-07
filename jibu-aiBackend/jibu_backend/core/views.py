from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from .models import UploadedPaper
from .serializers import UploadedPaperSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework import generics
from .serializers import RegisterSerializer
from django.contrib.auth.models import User


# views.py
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class UploadPaperView(generics.CreateAPIView):
    serializer_class = UploadedPaperSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
class AnalyzeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Example request body: {"question": "Explain photosynthesis"}
        question = request.data.get("question")
        
        # TODO: Integrate OpenAI or custom AI logic here
        ai_response = f"AI-generated answer for: {question}"

        return Response({
            "question": question,
            "answer": ai_response
        })