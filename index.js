const fs = require("fs");
const path = require('path');
const WPAPI = require('wpapi/superagent');

const wp = new WPAPI({ 
    endpoint: 'http://localhost/php/wordpress/wp-json/',
    username: 'admin',
    password: 'qazwsxedc'
});

let imageDir = path.join(__dirname + '/imagens');
let imagePath = imageDir + '/bob_esponja_1.jpg';
let _postData = {
    title: 'This post has media, tags andcategories!',
    content: 'Excellent and compelling demonstration',
    slug: 'post-with-media',
    status: 'publish'
}

function processaDiretorioImagens(path){

    fs.readdir(path, function(err, items) {
        if(err){
            throw Error(err);
        }

        if(items){
            for (var i=0; i < items.length; i++) {
                let _img = items[i];
                setPostAndMedia(_postData, imageDir + '\\' + _img);
                console.log('processaDiretorioImagens', _img);
            }
        }
        return _imagens;
    });

    return _imagens;
}

processaDiretorioImagens(imageDir);

/** /
// Request methods return Promises.
wp.posts().get()
    .then(function( data ) {
        // do something with the returned posts
        console.log(data);
    })
    .catch(function( err ) {
        // handle error
        console.log(err);
    });
/**/

/** /
// post create
let _postID = 0;
let _form = {
    title: "Novo teste em: " + new Date(),
    slug: "novo-teste",
    caption: "novo teste",
    status: "publish"
};
wp.posts().create(_form)
    .then(function( data ) {
        // do something with the returned posts
        _postID = data.id;
        console.log(data);
    })
    .catch(function( err ) {
        // handle error
        console.log(err);
    });
/**/

/** /
// media upload
wp.media()
    // Specify a path to the file you want to upload, or a Buffer
    .file(imagePath)
    .create({
        title: 'My awesome image',
        alt_text: 'an image of something awesome',
        caption: 'This is the caption text',
        description: 'More explanatory information'
    })
    .then(function( response ) {
        // Your media is now uploaded: let's associate it with a post
        var newImageId = response.id;
        return wp.media().id( newImageId ).update({
            post: _postID
        });
    })
    .then(function( response ) {
        console.log( 'Media ID #' + response.id );
        console.log( 'is now associated with Post ID #' + response.post );
    })
    .catch(function( err ) {
        // handle error
        console.log(err);
    });

/**/

/**/
// media upload
function setPostAndMedia(postdata, image){
    wp.posts()
    .create(postdata)
    .then(function( post ) {
      console.log( 'Post created with ID #' + post.id );
  
      // Create the media record & upload your image file
      return wp.media()
      .file( image )
      .create({
        title: 'Amazing featured image',
        // This property associates our new media record with our new post:
        post: post.id
      })
      .then(function( media ) {
        console.log( 'Media uploaded with ID #' + media.id );
        // Set the new media record as the post's featured media
        return wp.posts().id( post.id ).update({
          featured_media: media.id
        });         
      });
    });
}
/**/
