let maindiv = document.createElement("div");
maindiv.setAttribute("class", "maindiv");

let div = document.createElement("div");
div.innerHTML = "Check the countries Name for the names here.";
div.setAttribute("class", "div");

let inputbox = document.createElement("input");
inputbox.setAttribute("type", "text");
inputbox.setAttribute("class", "textbox");

let btn = document.createElement("button");
btn.innerHTML = "Search";
btn.setAttribute("type", "submit");
btn.setAttribute("class", "btn");

let para = document.createElement("p");
para.setAttribute("class", "para");

maindiv.append(div, inputbox, btn, para);
document.body.append(maindiv);

btn.addEventListener("click", () => {
  if (inputbox.value) {
    let url = `https://api.nationalize.io?name=${inputbox.value}`;
    search(url);
  }
});

async function search(url) {
  try {
    para.innerHTML = "";
    let res = await fetch(url);
    let result = await res.json();
    let countriesName = "";
    let countryProb = [];

    result.country.forEach((coun) => {
      countriesName += coun.country_id + " ";
      countryProb.push(coun.probability);
    });
    let countries = document.createElement("div");
    if (countriesName === "") {
      countries.innerHTML =
        "Sorry! There is no Name found! Please search for a different Name.";
      para.append(countries);
      console.log(
        "Sorry! There is no Name found! Please search for a different Name."
      );
      return;
    }

    countries.innerText = `The Nationality for ${inputbox.value} are: ${countriesName}`;
    console.log(countries.innerHTML);
    para.append(countries);
    console.log(countryProb);
    let probabilities = document.createElement("div");
    let probability = [];
    if (countryProb.length === 1) {
      probability.push(countryProb[0]);
      probabilities.innerHTML = `The only country having the name ${inputbox.value} is ${countriesName} and the probability is ${probability[0]}`;
    } else {
      let firstMaxProb = Math.max(...countryProb);
      probability.push(firstMaxProb);
      for (let i of countryProb) {
        if (i === firstMaxProb) {
          countryProb.splice(i, 1);
        }
      }
      let secondMaxProb = Math.max(...countryProb);
      probability.push(secondMaxProb);
      console.log(probability);
      let firstMaxCountry = "";
      let secondMaxCountry = "";
      result.country.forEach((coun) => {
        if (coun.probability === firstMaxProb) {
          firstMaxCountry = coun.country_id;
        } else if (coun.probability === secondMaxProb) {
          secondMaxCountry = coun.country_id;
        }
      });

      probabilities.innerHTML = `The Top two Countries are: ${firstMaxCountry} and ${secondMaxCountry} <br><br>
      The Top Two Probablities are: ${firstMaxProb} and ${secondMaxProb}`;
    }
    para.append(probabilities);
    console.log(probabilities.innerText);
  } catch (err) {
    console.log(err);
  }
}
