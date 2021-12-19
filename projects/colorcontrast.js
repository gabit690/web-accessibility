const hexToRgb = (hexColor) => {
    return {
        red: parseInt(hexColor.substr(1,2), 16),
        green: parseInt(hexColor.substr(3,2), 16),
        blue: parseInt(hexColor.substr(5,2), 16)
    };
};

const luminance = (red, green, blue) => {
    let a = [red, green, blue].map((value) => {
        value /= 255;
        return value <= 0.03928
            ? value / 12.92
            : Math.pow( (value + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const contrastRatio = (rgb1, rgb2) => {
    let lum1 = luminance(rgb1.red, rgb1.green, rgb1.blue);
    let lum2 = luminance(rgb2.red, rgb2.green, rgb2.blue);
    let brightest = Math.max(lum1, lum2);
    let darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
};

const contrastQuality = (ratio = 1) => {
    if (ratio >= 1 && ratio < 4)
        return "awful";
    else if  (ratio >= 4 && ratio < 8)
        return "poor";
    else if  (ratio >= 8 && ratio < 12)
        return "minimum";
    else if  (ratio >= 12 && ratio < 17)
        return "good";
    else if  (ratio >= 17 && ratio < 22)
        return "excellent";
};

const qualifyBoxContrast = (quality) => {
    document.getElementById("result-box").innerText = quality;
};

window.addEventListener("DOMContentLoaded", () => {
    const colorPickers = document.getElementsByClassName("picker");
    for (let picker of colorPickers) {
        picker.addEventListener("change", (event) => {
            let hexColor = event.target.value;
            picker.setAttribute("value", hexColor);
            document.getElementById("text-box").style[event.target.id] = hexColor;
            let backgroundColor = hexToRgb(colorPickers[0].value);
            let textColor = hexToRgb(colorPickers[1].value);
            let quality = contrastQuality(contrastRatio(backgroundColor, textColor));
            qualifyBoxContrast(quality);
        });
    };
});