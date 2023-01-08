var token = "90932445|-31949270226079223|90955297";
var dbName = "COLLEGE-DB";
var relName = "PROJECT-TABLE"
resetForm()

function validateAndGetFornData() {
    var pid = $("#Project_Id").val();

    if (pid === "") {
        alert("Project id is required to move further");
        $("Project_Id").focus();
        return "";
    }

    var pn = $("#Project_Name").val();
    if (pn === "") {
        alert("Project Name is required to move further");
        $("#Project_Name").focus();
        return "";
    }

    var name = $("#Assigned_to").val();
    if (name === "") {
        alert("Name field is required");
        $("#Assigned_to").focus();
        return "";
    }

    var date = $("#Assignment_Date").val();
    if (date === "") {
        alert("Assignment_Date is required to move further");
        $("#Assignment_Date").focus();
        return "";
    }

    var deadline = $("#Deadline").val();
    if (deadline === "") {
        alert("Deadline date is required");
        $("#Deadline").focus();
        return "";
    }

    var jsonStrObj = {
        Project_Id: pid,
        Project_Name: pn,
        Assigned_to: name,
        Assignment_Date: date,
        Deadline: deadline

    }

    return JSON.stringify(jsonStrObj);
}

function UpdateRecord() {
    var jsonStr = validateAndGetFornData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createUPDATERecordRequest(token, jsonStr, dbName, relName, localStorage.getItem("rec_no"));
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
    if (resultObj.status == 200) {
        alert("Data Stored Successfully")
    } else if (resultObj.status == 401) {
        alert("Invalid Token")
    } else if (resultObj.status == 400) {
        alert("Error, try again !")
    }
    jQuery.ajaxSetup({ async: true });
    resetForm();
}

function savetoloavelstorage(resultObj) {
    var data = JSON.parse(resultObj.data)
    localStorage.setItem('rec_no', data.rec_no)
}

function resetForm() {
    $("#Project_Id").val("");
    $("#Project_Name").val("").prop("disabled", true);
    $("#Assigned_to").val("").prop("disabled", true);
    $("#Assignment_Date").val("").prop("disabled", true);
    $("#Deadline").val("").prop("disabled", true);
    $("#Project_Id").prop("disabled", false)
    $("#savebutton").prop("disabled", true)
    $("#update").prop("disabled", true)
    $("#reset").prop("disabled", true)
}

function enableInput() {
    $("Project_Id").prop("disabled", false);
    $("#Project_Name").prop("disabled", false);
    $("#Assigned_to").prop("disabled", false);
    $("#Assignment_Date").prop("disabled", false);
    $("#Deadline").prop("disabled", false);
    $("#reset").prop("disabled", false)

}
document.getElementById("Project_Id").addEventListener("focusout", function(event) {
    var result = checkrecord()
})

function checkrecord() {
    var pid = $("#Project_Id").val();
    if (pid === "") {
        alert("Project ID is required");
        $("#Project_Id").focus();
        return "";
    }

    var jsonObj = {
        Project_Id: pid
    }
    var jsonStr = JSON.stringify(jsonObj);
    if (jsonStr === "") {
        return;
    }
    var getReqStr = createGET_BY_KEYRequest("90932445|-31949270226079223|90955297", "COLLEGE-DB", "PROJECT-TABLE", jsonStr, true, true);
    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(getReqStr, "http://api.login2explore.com:5577", "/api/irl");
    if (resultObj.status != 200) {
        $("#savebutton").prop("disabled", false)
        enableInput()
    } else {
        $("#savebutton").prop("disabled", true)
        fillData(resultObj)
        return true;
    }
}

function fillData(resultObj) {
    var data = JSON.parse(resultObj.data);
    var data1 = JSON.stringify(data.record)
    var data2 = JSON.parse(data1)
    $("#Project_Id").val(data2.Project_Id);
    $("#Project_Name").val(data2.Project_Name);

    $("#Assigned_to").val(data2.Assigned_to);
    $("#Assignment_Date").val(data2.Assignment_Date);
    $("#Deadline").val(data2.Deadline);

    jQuery.ajaxSetup({ async: true });
    savetoloavelstorage(resultObj)
    $("#Project_Id").prop("disabled", true)
    $("#savebutton").prop("disabled", true)
    $("#Project_Id").prop("disabled", true)
    $("#update").prop("disabled", false)

    enableInput()
}

function Register() {
    var jsonStr = validateAndGetFornData();
    if (jsonStr === "") {
        return;
    }
    var putReqStr = createPUTRequest(token, jsonStr, dbName, relName);

    jQuery.ajaxSetup({ async: false });
    var resultObj = executeCommandAtGivenBaseUrl(putReqStr, "http://api.login2explore.com:5577", "/api/iml");
    if (resultObj.status == 200) {
        alert("Data added Successfully")
    } else if (resultObj.status == 401) {
        alert("Invalid Token")
    } else if (resultObj.status == 400) {
        alert("Error, Try Again !")
    }
    jQuery.ajaxSetup({ async: true });
    resetForm();
}