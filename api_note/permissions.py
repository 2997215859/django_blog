# -*- coding:utf-8 -*-
from rest_framework.permissions import BasePermission, SAFE_METHODS
from rest_framework.compat import is_authenticated

class IsOwnerOrReadOnly(BasePermission):
    """
    自定义权限，只有创建者才能编辑
    """
    def has_object_permission(self, request, view, obj):
        # Read permission are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests
        if request.method is SAFE_METHODS:
            return True

        # Write permission are only allowed to owner of the notebook
        return obj.owner == request.user

