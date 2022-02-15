from utils import Utils
from flask import Flask, render_template, send_from_directory
import json
import os
import traceback
from flask import jsonify,request,send_from_directory
from flask import send_file
from fpdf import FPDF
import textwrap
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient

def AzureBlobUploadFile(blob_service_client ,container_name, file_name, blob_name):
    try:
        
        blob_client = blob_service_client.get_blob_client(container=container_name, blob=blob_name)

        
        with open(file_name, "rb") as data:
            blob_client.upload_blob(data)

        return container_name+"/"+blob_name

    except Exception as ex:
        return ex
def AzureBlobConnect(connection_string):
    try:

        
        blob_service_client = BlobServiceClient.from_connection_string(connection_string)

        
        return blob_service_client

    except Exception as ex:
        return ex




app = Flask(__name__)





@app.route('/')
def index():
    

    return render_template('index.html')




@app.route('/exportreport', methods=['GET','POST'])
def export_Report():



    try: 

        
        
        json_data = request.get_json()
        
        pdf_data=json_data["Data"]
        reportid=json_data["Title"]
        UPLOAD_DIRECTORY = os.getcwd()
        
        filename=f"{reportid}.pdf"
        #text_to_pdf(pdf_data, "test.pdf")

        



        with open(os.path.join(UPLOAD_DIRECTORY, filename), 'wb') as fp:
            fp.write(pdf_data.encode("utf-8"))
        vaultkey="DefaultEndpointsProtocol=https;AccountName=instavatpoc;AccountKey=FeJ93qE/SrMbBjC/N/TlNdatGXvaWhCRXwpKleDWQD9p6v+U0ndN8zCHAPHksjRCRSHKQi9X4jAa+AStFZ4OhQ==;EndpointSuffix=core.windows.net"
        blob_connect = AzureBlobConnect(vaultkey)
        print(blob_connect)
        blob_service_client=blob_connect
        container_name="poc"
        file_name=os.path.join(UPLOAD_DIRECTORY, filename)
        blob_name=filename
        AzureBlobUploadFile(blob_service_client ,container_name, file_name, blob_name)

        return ({'status':200,'message':'pdf printed','error':''})
    except Exception as e:
        print(traceback.format_exc())
        return ({'status':500,'message':'Internal Server Error','error':str(e)})


   


@app.route('/favicon.ico', methods=['GET'])
def getfavicon():
    

    return send_from_directory(os.path.join(app.root_path, 'static'), 'img/favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == '__main__':
    app.run()