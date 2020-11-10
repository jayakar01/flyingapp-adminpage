function upload()
{
    //get your blog text
    var name=document.getElementById('name').value;
    //get your blog text
    var req=document.getElementById('req').value;
    //get your blog text
    var email=document.getElementById('email').value;
    //get your blog text
    var phone=document.getElementById('phone').value;
    //get image name
    var imageName=image.name;

    function(error)
    {
      //handle error here
      console.log(error.message);
    }
    function()
    {
        //handle successfull upload here..
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL)
        {
           //get your image download url here and upload it to databse
           //our path where data is stored ...push is used so that every post have unique id
           firebase.database().ref('blogs/').push().set(
            {
                text:name,
                text:req,
                text:email,
                text:phone
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
}


function getdata()
{
    firebase.database().ref('blogs/').once('value').then(function(snapshot)
    {
        //get your posts div
        var posts_div=document.getElementById('posts');
        //remove all remaining data in that div
        posts.innerHTML="";
        //get data from firebase
        var data=snapshot.val();
        console.log(data);
        //now pass this data to our posts div
        //we have to pass our data to for loop to get one by one
        //we are passing the key of that post to delete it from database
        for(let[key,value] of Object.entries(data))
        {
            posts_div.innerHTML="<div class='col-sm-4 mt-2 mb-1'>"+
            "<div class='card'>"+
            "<div class='card-body'><p class='card-text'>"+value.text+"</p>"+
            "<button class='btn btn-danger' id='"+key+"' onclick='delete_post(this.id)'>Delete</button>"+
            "</div></div></div>"+posts_div.innerHTML;
        }

    });
}

function delete_post(key)
{
    firebase.database().ref('blogs/'+key).remove();
    getdata();
}