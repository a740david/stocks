from rest_framework import mixins
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet



# only logged-in users can create a review
# only user that created a review can update/delete it
class ReviewsPermissions(BasePermission):
    def has_permission(self, request, view):
        print('Called has_permission')
        if request.method in ['POST']:
            return request.user.is_authenticated
        return True

    def has_object_permission(self, request, view, obj):
        print('Called has_object_permission')
        if request.method in ['PATCH', 'PUT', 'DELETE']:
            return request.user.is_authenticated and request.user.id == obj.user_id
        return True