
const http = require('http') // import module
const server = http.createServer(); // create server


const users = [ // fixed users info
    {
        id: 1,
        name: "Rebekah Johnson",
        email: "Glover12345@gmail.com",
        password: "123qwe",
    },
    {
        id: 2,
        name: "Fabian Predovic",
        email: "Connell29@gmail.com",
        password: "password",
    },
    {
        id: 3,
        name: "new user 1",
    },
    {
        id: 4,
        name: "new user 2",
    },
];
    
const posts = [ // fixed posts info
    {
        id: 1,
        title: "간단한 HTTP API 개발 시작!",
        content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현.",
        userId: 1,
    },
    {
        id: 2,
        title: "HTTP의 특성",
        content: "Request/Response와 Stateless!!",
        userId: 1,
    },
    {
        id: 3,
        imageurl: "내용 1",
        content: "sampleContent3",
    },
    {
        id: 4,
        imageurl: "내용 2",
        content: "sampleContent4",
    },
];

const httpRequestListener = function (request, response) {
    const { url, method } = request
        if (method === 'POST') { // start if (method === 'POST')
            if (url === '/users/signup') { //start if (url==='/users/signup')
                let body = '';
                request.on('data', (data) => {
                    body += data;
                });

                // after receiving full stream
                request.on('end', () => {
                    const user = JSON.parse(body);

                    users.push({
                        id : user.id,
                        name : user.name,
                        email : user.email,
                        password : user.password,
                    })
                    response.writeHead(200, {'Content-Type' : 'application/json'});
                    response.end(JSON.stringify({"users" : users}))
                })
            } //end if (url === /user/signup)

            else if (url === '/posts/posting') { // start else if ('/post/posting')
                let body = '';
                request.on('data', (data) => {
                    body += data;
                });

                // after receiving full stream
                request.on('end', () => {
                    const post = JSON.parse(body);

                    posts.push({
                        id : post.id,
                        title : post.title,
                        content : post.content,
                        userId : post.userId,
                    })
                    response.writeHead(200, {'Content-Type' : 'application/json'});
                    response.end(JSON.stringify({"posts" : posts}))
                })
            } // end else if (url === post/posting)
        } // end if (method === 'POST')

        else if (method === 'GET') { // start else if (method === 'GET')
            if (url === '/getFeed') {
                let data = []
                for (i=0; i<users.length; i++) {
                data.push({
                    "userID" : users[i].id,
                    "userName" : users[i].name,
                    "postingId" : posts[i].id,
                    "postingTitle" : posts[i].title,
                    "postingContent" : posts[i].content,
                    "postingImageUrl" : posts[i].imageurl,
                })
                }
                response.writeHead(200, {'Content-Type' : 'application/json'});
                response.end(JSON.stringify({"data" : data}))
            }
        } // end else if (method === 'GET')

        else if ( method === "PATCH" ) { // start else if (method === 'PATCH')

            let patchIndex = 1-1 ; // where the n in n-1 is the userId
            let patchInfo = "노드" // patch to this variable
            posts[patchIndex].content = '노드'; // patch data

                data = {
                    "userID" : users[patchIndex].id,
                    "userName" : users[patchIndex].name,
                    "postingId" : posts[patchIndex].id,
                    "postingTitle" : posts[patchIndex].title,
                    "postingContent" : patchInfo, //posts[patchIndex].content     // key that needs to be patched
                    "postingImageUrl" : posts[patchIndex].imageurl,
                }

                response.writeHead(200, {'Content-Type' : 'application/json'});
                response.end(JSON.stringify({"data" : data}))
        } // end else if (method === 'PATCH')
};



/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

server.on("request", httpRequestListener);

server.listen(8000, '127.0.0.1', function() { 
    console.log('Listening to requests on port 8000');
});