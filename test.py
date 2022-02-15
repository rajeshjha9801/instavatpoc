from powerbiclient import Report, models
# Import the DeviceCodeLoginAuthentication class to authenticate against Power BI
from powerbiclient.authentication import DeviceCodeLoginAuthentication

# Initiate device authentication
device_auth = DeviceCodeLoginAuthentication()
group_id='06064e6a-dbc3-422b-9e51-e6aef6851da8'
report_id='9a093014-7084-40f7-baa4-1740d75a2e2a' 
report = Report(group_id=group_id, report_id=report_id, auth=device_auth)

report