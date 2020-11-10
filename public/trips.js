function upload()
{
    //get your image
    var image=document.getElementById('image').files[0];
    //get your blog text
    var name=document.getElementById('name').value;
    //get your blog text
    var post=document.getElementById('post').value;
    //get your blog text
    var price=document.getElementById('price').value;
    //get image name
    var imageName=image.name;
    //firebase storage reference
    //it is the path where your image will be stored
    var storageRef=firebase.storage().ref('images/'+imageName);
    //upload image to selected storage reference
    //make sure you pass image here
    var uploadTask=storageRef.put(image);
    //to get the state of image uploading....
    uploadTask.on('state_changed',function(snapshot){
         //get task progress by following code
         var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
         console.log("upload is "+progress+" done");
    }
    ,function(error)
    {
      //handle error here
      console.log(error.message);
    }
    ,function()
    {
        //handle successfull upload here..
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL)
        {
           //get your image download url here and upload it to databse
           //our path where data is stored ...push is used so that every post have unique id
           firebase.database().ref('blogs/').push().set(
            {
                text:name,
                text:post,
                text:price,
                imageURL:downloadURL
            }
           ,function(error)
           {
               if(error)
               {
                   alert("Error while uploading");
               }
               else
               {
                   alert("Successfully uploaded");
                   //now reset your form
                   document.getElementById('post-form').reset();
                   getdata();
               }
           });
        });
    });

}

window.onload=function(){
    this.getdata();
    console.log('I AM HERE !!')
}


function getdata()
{
    // debugger.collection('')
    db.collection('trips').onSnapshot(function(snapshot)
    {
      //get your posts div
      var posts_div= document.getElementById('trips-catalogue');
      //remove all remaining data in that div
      posts_div.innerHTML="";
      //get data from firebase
      var data=snapshot.docs;
      
      //now pass this data to our posts div
      //we have to pass our data to for loop to get one by one
      //we are passing the key of that post to delete it from database
      if (data.length) {
        let html = '';
        data.forEach(doc => {
          const trip = doc.data();
          console.log(trip);
          const li = `
            <div class="col-sm-6 mt-2 mb-1">
                <div class="card">
                    <img src="${trip.url}" style="height:250px;">
                    <div class="card-body">
                        <p class='card-text'>
                            ${trip.destination}
                        </p>
                        
                        <!-- Trigger the modal with a button -->
                        <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal${trip.tripID}">View</button>
                        
                        <!-- Modal -->
                        <div id="myModal${trip.tripID}" class="modal fade" role="dialog">
                            <div class="modal-dialog">

                                <!-- Modal content-->
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">${trip.destination}</h4>
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>
                                    <div class="modal-body" >
                                        <div class="container">
                                            <div id="accordion${trip.tripID}">
                                                <div class="card">
                                                    <div class="card-header" id="headingOne${trip.tripID}">
                                                        <h5 class="mb-0">
                                                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne${trip.tripID}" aria-expanded="true" aria-controls="collapseOne${trip.tripID}">
                                                            Trip Info
                                                        </button>
                                                        </h5>
                                                    </div>
                                            
                                                    <div id="collapseOne${trip.tripID}" class="collapse show" aria-labelledby="headingOne${trip.tripID}" data-parent="#accordion${trip.tripID}">
                                                        <div class="card-body">
                                                            <img src="${trip.url}" style="height:250px;"><br><br>
                                                            <p> 
                                                                <b>Trip-Id:</b> ${trip.tripID}</p>
                                                            <p> Fare: ${trip.fare}</p>
                                                            <p> Days: ${trip.days}</p>
                                                            <p> Nights: ${trip.nights}</p>
                                                            <p> Total Places: ${trip.totalplaces}</p>
                                                            <p> Contact 1: ${trip.contact1}</p>
                                                            <p> Contact 2: ${trip.contact2}</p>
                                                            <b> First Paragraph:</b>
                                                            <p> ${trip.info1}</p>
                                                            <b> Second Paragraph:</b>
                                                            <p> ${trip.info2}</p><br><br>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="headingTwo${trip.tripID}">
                                                        <h5 class="mb-0">
                                                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo${trip.tripID}" aria-expanded="false" aria-controls="collapseTwo${trip.tripID}">
                                                            Places
                                                        </button>
                                                        </h5>
                                                    </div>
                                                    <div id="collapseTwo${trip.tripID}" class="collapse" aria-labelledby="headingTwo${trip.tripID}" data-parent="#accordion${trip.tripID}">
                                                        <div class="card-body" id = "places${trip.tripID}">
                                                            No places added yet
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="card">
                                                    <div class="card-header" id="headingThree${trip.tripID}">
                                                        <h5 class="mb-0">
                                                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree${trip.tripID}" aria-expanded="false" aria-controls="collapseThree${trip.tripID}">
                                                            Day Wise Schedule
                                                        </button>
                                                        </h5>
                                                    </div>
                                                    <div id="collapseThree${trip.tripID}" class="collapse" aria-labelledby="headingThree${trip.tripID}" data-parent="#accordion${trip.tripID}">
                                                        <div class="card-body" id = "days${trip.tripID}">
                                                            Day wise Schedule not added yet.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div> 
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <button class="btn btn-danger" id="key${trip.tripID}" onclick="delete_post(${trip.destnation}">Delete</button>
                    </div>
                </div>
            </div>`
          db.collection(`trips/${trip.destination}/places`).onSnapshot(function(placesCollection)
          {
            var places_div = document.getElementById(`places${trip.tripID}`);
            var placesData = placesCollection.docs;
            if(placesData.length){
                let placesHtml = `
                    <div id="placesAccordion">
                `;
                placesData.forEach(placeDoc => {
                    const place = placeDoc.data();
                    console.log(place);
                    var placeLi = `
                    <div class="card">
                        <div class="card-header" id="place${place.id}">
                            <h5 class="mb-0">
                                <button class="btn btn-link" data-toggle="collapse" data-target="#pcollapse${place.id}" aria-expanded="false" aria-controls="aria-controls="pcollapse${place.id}">
                                ${place.name}
                                </button>
                            </h5>
                        </div>
                    
                        <div id="pcollapse${place.id}" class="collapse show" aria-labelledby="place${place.id}" data-parent="#placesAccordion">
                            <div class="card-body">
                                <img src="${place.url}" style="height:250px;"><br><br>
                                <p> 
                                    <b>Place Id:</b> ${place.placeID}</p>
                                <b> Place Info:</b>
                                <p> ${place.info}</p>
                            </div>
                        </div>
                    </div>
                    
                    `; 
                    placesHtml += placeLi;
                });
                placesHtml += '</div>'
                places_div.innerHTML = placesHtml
            }
          });

          
          html += li;

        });
        

        posts_div.innerHTML = html
      } else {
        posts_div.innerHTML = '<h5 class="center-align">No Trips to show</h5>';
      }
    
    });
}

function delete_post(key){
    db.collection('trips').doc(key).delete();
    getdata();

}