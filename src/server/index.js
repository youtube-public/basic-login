function sendJson(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function handlePath(path, body) {
  if (path === "login") {
    const { username, password } = body;
    if (username === "ole" && password == "pass") {
      const user = {
        firstname: "fake_siraphop",
        lastname: "fake_nonpala",
      };
      return { status: 200, message: "login success", data: { user } };
    } else {
      return { status: 405, message: "login fail" };
    }
  }
  return { status: 400, message: "path not found" };
}

function handleMethods(e, method) {
  const path = e.parameter.path;
  const body =
    method === "GET"
      ? e.parameter
      : {
          ...JSON.parse(e.postData.contents),
          ...e.parameter,
        };
  if (path) {
    return sendJson(handlePath(path, body));
  }

  return sendJson({
    status: 200,
    message: "api google apps script connected!",
  });
}

function doGet(e) {
  return handleMethods(e, "GET");
}

function doPost(e) {
  return handleMethods(e, "POST");
}
