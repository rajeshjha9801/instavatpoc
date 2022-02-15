# Copyright (c) Microsoft Corporation.
# Licensed under the MIT license.

class BaseConfig(object):

    # Can be set to 'MasterUser' or 'ServicePrincipal'
    AUTHENTICATION_MODE = 'ServicePrincipal'
    # Workspace Id in which the report is present
    WORKSPACE_ID = '06064e6a-dbc3-422b-9e51-e6aef6851da8'
    #WORKSPACE_ID='06064e6a-dbc3-422b-9e51-e6aef6851da8'
    
    
    # Report Id for which Embed token needs to be generated
    REPORT_ID = '9a093014-7084-40f7-baa4-1740d75a2e2a' 
    #REPORT_ID='26635f71-f986-4ea7-8bea-cbf3ce9d0556'   

    DATASET_ID="6906f4f5-d553-491c-ac0b-5d4f39746a81"

    # Id of the Azure tenant in which AAD app and Power BI report is hosted. Required only for ServicePrincipal authentication mode.
    TENANT_ID = '9698d557-ca05-4f0b-9d66-743ee341b508'

    # Client Id (Application Id) of the AAD app
    #a7d21408-8ff8-42a5-9739-15a70b823f56
    CLIENT_ID_EMBED = 'a7d21408-8ff8-42a5-9739-15a70b823f56'
    CLIENT_ID='c4047808-6db5-4fcb-b33c-22ed276976c5'
    

    # Client Secret (App Secret) of the AAD app. Required only for ServicePrincipal authentication mode.
    CLIENT_SECRET_EMBED = 'kxW7Q~5muWkrSlFhyupuS.qCMPzQNd_H2pjp4'
    CLIENT_SECRET = 'GJA7Q~J7p9eOA4YmyuDJ0seYgaThvbhEd7ooz'
    #client_secret_new_app_service(exim-test-app)
    #GJA7Q~J7p9eOA4YmyuDJ0seYgaThvbhEd7ooz

    # Scope of AAD app. Use the below configuration to use all the permissions provided in the AAD app through Azure portal.
    SCOPE = ['https://analysis.windows.net/powerbi/api/.default']

    # URL used for initiating authorization request
    AUTHORITY = 'https://login.microsoftonline.com/organizations'

    # Master user email address. Required only for MasterUser authentication mode.
    POWER_BI_USER = 'pbi_exim_uat@EnY.onmicrosoft.com'

    # Master user password. Required only for MasterUser authentication mode.
    POWER_BI_PASS = """d6RJ8"=VPxY8eT[C"""
