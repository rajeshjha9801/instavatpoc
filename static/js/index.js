// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

$(function () {
    var reportContainer = $("#report-container").get(0);

    // Initialize iframe for embedding report
    //powerbi.bootstrap(reportContainer, { type: "report" });

    var models = window["powerbi-client"].models;
    var reportLoadConfig = {
        type: "report",
        tokenType: models.TokenType.Embed,

        // Enable this setting to remove gray shoulders from embedded report
        // settings: {
        //     background: models.BackgroundType.Transparent
        // }
    };

    $.ajax({
        type: "GET",
        url: "/getembedinfo",
        dataType: "json",
        success: function (data) {
            embedData = $.parseJSON(JSON.stringify(data));
            reportLoadConfig.accessToken = embedData.accessToken;

            // You can embed different reports as per your need
            reportLoadConfig.embedUrl = embedData.reportConfig[0].embedUrl;

            // Use the token expiry to regenerate Embed token for seamless end user experience
            // Refer https://aka.ms/RefreshEmbedToken
            tokenExpiry = embedData.tokenExpiry;

            // Embed Power BI report when Access token and Embed URL are available
            var report = powerbi.embed(reportContainer, reportLoadConfig);
            console.log(report);

            // Triggers when a report schema is successfully loaded
            report.on("loaded", function () {
                console.log("Report load successful")
            });

            // Triggers when a report is successfully embedded in UI
            report.on("rendered", function () {
                console.log("Report render successful")
            });

            // Clear any other error handler event
            report.off("error");

            // Below patch of code is for handling errors that occur during embedding
            report.on("error", function (event) {
                var errorMsg = event.detail;

                // Use errorMsg variable to log error in any destination of choice
                console.error(errorMsg);
                return;
            });
        },
        error: function (err) {

            // Show error container
            var errorContainer = $(".error-container");
            $(".embed-container").hide();
            errorContainer.show();

            // Format error message
            var errMessageHtml = "<strong> Error Details: </strong> <br/>" + $.parseJSON(err.responseText)["errorMsg"];
            errMessageHtml = errMessageHtml.split("\n").join("<br/>")

            // Show error message on UI
            errorContainer.html(errMessageHtml);
        }
    });
});
var inProgressRequest = 0;
const fetchApi = async (...args) => {
    let resp = null
    try {
        showLoader()
        resp = await fetch(...args)
    }
    catch (err) {
        console.error(err)
        showToast('Something went wrong!!')
        throw err;
    }
    finally {
        hideLoader()
        return resp
    }
}
var showLoader = function () {
    inProgressRequest++;
    $('#loader').show();
}

var hideLoader = function () {
    inProgressRequest--;
    if (inProgressRequest == 0)
        $('#loader').hide();
}
const exportReportCSV = async () => {

    let options = {
        method: 'get',
    }
    var type = 'CSV'

    let resp = await fetchApi(`./createExportId?key=${type}`, options)
    //console.log("response from api", resp)
    let respData = await resp.json()
    console.log("response from create id api --json", respData)
    

    if (respData.status == '202') {
        console.log("success")
        
        
        var export_Id = respData.export_Id
        
        let res = await fetchApi(`./exportIdStatus?key=${export_Id}`, options);
        let resData = await res.json();
        console.log("response from status api --json", resData);
        if (resData.message != "Succeeded") {
            res = await fetchApi(`./exportIdStatus?key=${export_Id}`, options)
            resData = await res.json();
            console.log("response from status api --json", resData);
            console.log("response from status api --message", resData.message);
        }

        if (resData.message != "Succeeded") {
            setTimeout(() => {
                console.log("waiting for 10 sec") }, 10000);
        }



        
        //if (resData.status == 202) {
        //    while (resData.message == "Succeeded") {
        //        res = await fetchApi(`./exportIdStatus?exportid=${export_Id}`, { method: 'get' })
        //        resData = await res.json()
        //        console.log("resData", resData)
        //        console.log("response from status api --json", resData)
        //    }
        //}
        if (resData.message == "Succeeded") {
            let res1 = await fetchApi(`./exportReport?key=${export_Id}`, options)
            console.log("response from fetch report api --json", res1)
        }
        else {
            console.log("Some error occured", resData.error)
        }




        /*
        if (respData.path) {
            console.log("download path", respData.path)
            let downloadPath = respData.path + `?q=${(Math.floor((Math.random() * 10000) + 1))}`
            window.location.href = './' + downloadPath
        }
        */
    }
    else {
        console.log("Some error occured", resp.message)
    }


}

const exportReportXLSX = async () => {

    let options = {
        method: 'get',
    }
    var type = 'XLSX'
    let resp = await fetchApi(`./createExportId?key=${type}`, options)
    //console.log("response from api", resp)
    let respData = await resp.json()
    console.log("response from create id api --json", respData)


    if (respData.status == '202') {
        console.log("success")


        var export_Id = respData.export_Id

        let res = await fetchApi(`./exportIdStatus?key=${export_Id}`, options);
        let resData = await res.json();
        console.log("response from status api --json", resData);
        if (resData.message != "Succeeded") {
            res = await fetchApi(`./exportIdStatus?key=${export_Id}`, options)
            resData = await res.json();
            console.log("response from status api --json", resData);
            console.log("response from status api --message", resData.message);
        }

        if (resData.message != "Succeeded") {
            res = await fetchApi(`./exportIdStatus?key=${export_Id}`, options)
            resData = await res.json();
            console.log("response from status api --json", resData);
            console.log("response from status api --message", resData.message);
        }




        //if (resData.status == 202) {
        //    while (resData.message == "Succeeded") {
        //        res = await fetchApi(`./exportIdStatus?exportid=${export_Id}`, { method: 'get' })
        //        resData = await res.json()
        //        console.log("resData", resData)
        //        console.log("response from status api --json", resData)
        //    }
        //}
        if (resData.message == "Succeeded") {
            let res1 = await fetchApi(`./exportReport?key=${export_Id}`, options)
            console.log("response from fetch report api --json", res1)
        }
        else {
            console.log("Some error occured", resData.error)
        }




        /*
        if (respData.path) {
            console.log("download path", respData.path)
            let downloadPath = respData.path + `?q=${(Math.floor((Math.random() * 10000) + 1))}`
            window.location.href = './' + downloadPath
        }
        */
    }
    else {
        console.log("Some error occured", resp.message)
    }


}

const exportReportPDF = async () => {

    let options = {
        method: 'get',
    }
    var type = 'PDF'

    let resp = await fetchApi(`./createExportId?key=${type}`, options)
    //console.log("response from api", resp)
    let respData = await resp.json()
    console.log("response from create id api --json", respData)


    if (respData.status == '202') {
        console.log("success")


        var export_Id = respData.export_Id

        let res = await fetchApi(`./exportIdStatus?key=${export_Id}`, options);
        let resData = await res.json();
        console.log("response from status api --json", resData);
        if (resData.message != "Succeeded") {
            res = await fetchApi(`./exportIdStatus?key=${export_Id}`, options)
            resData = await res.json();
            console.log("response from status api --json", resData);
            console.log("response from status api --message", resData.message);
        }

        if (resData.message != "Succeeded") {
            setTimeout(() => {
                console.log("waiting for 10 sec")
            }, 10000);
        }




        //if (resData.status == 202) {
        //    while (resData.message == "Succeeded") {
        //        res = await fetchApi(`./exportIdStatus?exportid=${export_Id}`, { method: 'get' })
        //        resData = await res.json()
        //        console.log("resData", resData)
        //        console.log("response from status api --json", resData)
        //    }
        //}
        if (resData.message == "Succeeded") {
            let res1 = await fetchApi(`./exportReport?key=${export_Id}`, options)
            console.log("response from fetch report api --json", res1)
        }
        else {
            console.log("Some error occured", resData.error)
        }




        /*
        if (respData.path) {
            console.log("download path", respData.path)
            let downloadPath = respData.path + `?q=${(Math.floor((Math.random() * 10000) + 1))}`
            window.location.href = './' + downloadPath
        }
        */
    }
    else {
        console.log("Some error occured", resp.message)
    }


}



