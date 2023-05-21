import boto3
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, BasePermission, IsAdminUser
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from stocks_app.serializers.auth import SignupSerializer, UserSerializer


@api_view(['POST'])
def signup(request):
    signup_serializer = SignupSerializer(data=request.data, many=False)
    if signup_serializer.is_valid(raise_exception=True):
        new_user = signup_serializer.create(signup_serializer.validated_data)
        user_serializer = UserSerializer(instance=new_user, many=False)
        return Response(data=user_serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def me(request):
    # you will get here only if the user is already authenticated!
    user_serializer = UserSerializer(instance=request.user, many=False)
    return Response(data=user_serializer.data)




