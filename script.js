// Event listener for "search" button click
function searchArtist() {
    console.log("Search button clicked."); // Track button click
  
    // Store user input for artist name
    const artistName = document.getElementById("artistInput").value;
    console.log("Artist name entered:", artistName); // Log entered artist name
  
    // Store selected option of data type
    const dataType = document.getElementById("dataSelect").value;
    console.log("Data type selected:", dataType); // Log selected data type
  
    // Structure of API URL with query strings
    const apiUrl = `https://artistsearch-dev.gusmarko.com/dev/search?artist=${artistName}&type=${dataType}`;
    console.log("Constructed API URL:", apiUrl); // Log constructed API URL
  
    // Making request to API Gateway (fetch) that triggers Lambda function
    fetch(apiUrl)
      .then((response) => {
        console.log("Received response from API Gateway:", response); // Log raw response object
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`); // Log HTTP error codes
        }
        return response.json(); // Converting response to JSON
      })
      .then((data) => {
        console.log("Data received from API:", data); // Log data received from API
        console.log(data.data)
        console.log(data.artist)
        
        const outputContainer = document.getElementById("output");
        outputContainer.innerHTML = ""; // Clear output from last API call

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
      })
      .catch((error) => {
        console.error("Error occurred during fetch or processing data:", error); 
        outputContainer.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
      });
    }

