# Smart Rockets

This project comes from a Coding Train [video on YouTube](https://www.youtube.com/watch?v=bGz7mv2vD6g).

Upon starting, each rocket is loaded with a random set of vectors that apply force to move it in a direction. At the end of the vectors (lifespan) the round is over and the rockets are ranked by how close they got to the target (white ball). Rockets that hit the walls (explode) are not ranked. Before the next round, two rockets are chosen. The choice is made based on probability determined by their ranking. The two rockets (parents) are then combined to where the child rocket will share genes from both parents randomly. Once all the children are created they are run in the next round. The result of this is that the rockets perform better and better and pass their genes onto their offspring. Sometimes the paths that are successful will be very strange, but effective.

