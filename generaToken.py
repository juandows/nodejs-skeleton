import jwt
import sys
import datetime
secret = sys.argv[1]
print secret
encoded = jwt.encode({ 'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=86400)}, secret, algorithm='HS256')
print encoded
