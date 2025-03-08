from rest_framework_simplejwt.authentication import JWTAuthentication


class CookiesAuthentication(JWTAuthentication):
    def authenticate(self, request):
        try:

            access_token = request.COOKIES.get('access_token')
            if access_token is None:
                return None

            validated_token = self.get_validated_token(access_token)
            user = self.get_user(validated_token)
            return user, access_token

        except Exception:
            return None
