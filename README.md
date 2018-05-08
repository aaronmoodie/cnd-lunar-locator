# CND Lunar Locator

#### The Task

Create a Ruby on Rails web application that allows CND staff to choose from the 6 vehicles and obtain their location by calling the API specified above. 

The tool should also accept manual input of lunar lat/long to:
     
1. Show where the vehicle is on the lunar map; and       
2. Calculate the distance from the CND Command Centre (located at the Apollo 11 landing site at lat:0.681400, long: 23.460550) to the vehicle or coordinates supplied.

CND Staff are notoriously fickle and won't use a tool that is difficult to use or difficult to look at. This behaviour costs the business millions in inefficiencies, as the staff will wander around aimlessly looking for cars based purely on “gut-feel”.

#### Submission

This is my Lunar Locator app, built for the Car Next Door programming assignment. The working version is viewable via the Heroku link below. Visually, I got this to a reasonable place, but my code could have been a bit better. I chose to use Backbone served via a Sinatra app, as this is what I was most familiar with. With a little more time I would have looked at adding a package manager for the Javascript, which would have let me break the main app file up. The commenting and overall code structure could be cleaner as well.

#### Huroku app
https://cnd-lunar-locator.herokuapp.com/

#### Design

I've added in the design process I went through prior to starting on the code. My initial steps where to sketch out some ideas to make sure I covered all of the requirements. I specifically focused on ease of use, which was why I ended up collecting all the vehicles into a collection before loading them in the app.

> CND Staff are notoriously fickle and won't use a tool that is difficult to use or difficult to look at.

Selecting a vehicle primarily by ID seemed like it would make for a difficult UI.

<img width="485" alt="sketches" src="https://cloud.githubusercontent.com/assets/105030/19302251/0c449fba-90af-11e6-81b0-cdd14e9910f4.png">

After working on the sketches, I started working on polishing these a little in Sketch.

<img width="751" alt="vehicle-wireframe-1" src="https://cloud.githubusercontent.com/assets/105030/19302274/217ab70c-90af-11e6-86c2-c1685066965b.png">

<img width="738" alt="vehicle-wireframe-2" src="https://cloud.githubusercontent.com/assets/105030/19302282/284260e4-90af-11e6-9f2b-7f8c2c54fc87.png">

<img width="845" alt="tablet-wireframe" src="https://cloud.githubusercontent.com/assets/105030/19302293/2e548ca0-90af-11e6-9b19-0015a983528d.png">

When the layout seemed like it was in a good position, I looked at fleshing out the visual design a little. This was all still pretty light on in terms of process, but overall I'm pretty happy with where I got to in 3 days.

<img width="730" alt="vehicle-detail" src="https://cloud.githubusercontent.com/assets/105030/19302307/3b72bd76-90af-11e6-8585-3641e33065d6.png">
