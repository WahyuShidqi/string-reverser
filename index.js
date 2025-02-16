let input = document.querySelector("#text-input");
let result = document.querySelector("#result");
let resetBtn = document.querySelector("#reset");
// downlaod var
let downloadBtn = document.querySelector("#download");
let copyBtn = document.querySelector("#copy");

document.addEventListener("DOMContentLoaded", function () {
  input.addEventListener("input", function () {
    let inputValue = input.value;
    if (inputValue.length > 1) {
      result.value = inputValue.split("").reverse().join("");
    } else {
      result.value = "";
    }
  });
});

function copyText() {
  let copiedText = result.value;
  if (copiedText.length > 1) {
    navigator.clipboard
      .writeText(copiedText)
      .then(() => {
        swal("Text copied to clipboard!");
      })
      .catch((err) => {
        console.log("Failed to copy:", err);
      });
  } else {
    swal("uh oh! nothing to copy");
  }
}

function download() {
  let downloadText = result.value;
  if (downloadText.length > 1) {
    let blob = new Blob([downloadText], { type: "text/plain" });
    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "reversed-text.txt";
    link.click();

    URL.revokeObjectURL(link.href);
  } else {
    swal("Nothing to download except the wind!");
  }
}

function confirm() {
  swal("Are you sure? click outside of this box to cancel!").then((value) => {
    if (value === true) {
      download();
    } else {
      return;
    }
  });
}

function reset() {
  input.value = "";
  result.value = "";
}

downloadBtn.onclick = confirm;
copyBtn.onclick = copyText;
resetBtn.onclick = reset;
