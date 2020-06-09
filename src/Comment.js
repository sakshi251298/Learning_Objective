import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

// Params are placeholders in the URL that begin
// with a colon, like the `:id` param defined in
// the route in this example. A similar convention
// is used for matching dynamic segments in other
// popular web frameworks like Rails and Express.

export default function ParamsExample() {
  return (
    <Router>
      hello
      <div>
        <Switch>
          <Route path="/comments/:id">
            <SpecificComment />
          </Route>

          {/* <Route path="comments/:id"  children={<child />} />             */}
        </Switch>
      </div>
    </Router>
  );
}

function SpecificComment() {
    let { id } = useParams();
        return (
            <div>
          Comments of  { id }  
        </div>
    );
}

function Home() {
        return (
            <div id="comments"> 
                    All Comments 
            </div>
            );
}

// const Comment = ({Comment}) => {
//     return (
//         <div>
//             <center><h1>ET mantra</h1></center>
//             {Comment.map((Comment) => (
//                 <div class="card">
//                     <div class="card-body">
//                         <h5 class="card-title">{Comment.post}</h5>
                        
//                         <div>{require(Comment.content.rendered)}</div>

//                     </div>
//                 </div>
//             ))}
//         </div>
//     )
// };
//export default Comment;