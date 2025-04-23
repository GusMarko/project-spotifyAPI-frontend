// Event listener for "search" button click
function searchArtist() {
    console.log("Search button clicked."); 
  
    // Store user input for artist name
    const artistName = document.getElementById("artistInput").value;
    console.log("Artist name entered:", artistName); 
  
    // Store selected option of data type
    const dataType = document.getElementById("dataSelect").value;
    console.log("Data type selected:", dataType); 
  
    // Structure of API URL with query strings
    const apiUrl = `https://8l930ful23.execute-api.eu-central-1.amazonaws.com/main/search?artist=${artistName}&type=${dataType}`;
    console.log("Constructed API URL:", apiUrl); 
  
    // Making request to API Gateway (fetch) that triggers Lambda function
    fetch(apiUrl)
      .then((response) => {
        console.log("Received response from API Gateway:", response); 
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`); 
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data received from API:", data); 
        
        const outputContainer = document.getElementById("output");
        outputContainer.innerHTML = ""; 

        if (data.suggestions && Array.isArray(data.suggestions) && data.suggestions.length > 0) {
          let suggestionsHTML = `<h2>No exact match found for "${artistName}". Did you mean?</h2><ul>`;
          data.suggestions.forEach(suggestion => {
            suggestionsHTML += `<li>${suggestion}</li>`; // we make list of suggestions of artists with similar names
        })
          suggestionsHTML += `</ul><p>Please try searching again with a suggested name.</p>`;
          outputContainer.innerHTML = suggestionsHTML;
        
        } else if (data.artist && data.data) {
          const option = data.type;
          const responseArtist = data.artist;
          let result = data.data; 
        
        let htmlContent = ""
        if (option === "topSongs") {
            htmlContent = `<h2>Top Songs by ${responseArtist}</h2>`;
                result.forEach((song) => {
                    console.log(song);
                    htmlContent += `<p>${song}</p>`; // add songs with for loop
                });
        } else if (option === "bestSong") {
            htmlContent = `<h2>Most listened song by ${responseArtist}</h2>`;
            htmlContent += `<p>${result}</p>`;
       
        } else if (option === "latestAlbum") {
         htmlContent = `<h2>Latest Album by ${responseArtist}</h2>`;
            htmlContent += `<p>${result}</p>`;
        }
        outputContainer.innerHTML = htmlContent;
      }})
    
      .catch((error) => {
        console.error("Error occurred during fetch or processing data:", error); 
        outputContainer.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
      });
    }

