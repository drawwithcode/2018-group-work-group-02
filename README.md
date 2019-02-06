# Contrails
by <b>Guilherme Appolinário</b> and <b>Marzieh Meghdadi</b>.<p>
https://drawwithcode.github.io/2018-group-work-group-02/ <p>
https://www.behance.net/gallery/75614125/Contrails-Web-App

<img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/e1fac575614125.5c59b756b7d79.png" alt="" height="100%" width="100%">
</div>

# Project Idea

Contrail is a short name for the condensation trails left by airplanes in the sky. They make  nice shapes in the sky but they are not always the same. Sometimes they are intense, sometime are light and sometimes they disappear. Our idea was born after thinking about why the airplanes contrails are different. Then, we decided to show how they work by a mobile interactive system.

According to our studies, the shape and the intensity of the contrails depend on some different elements such as the number of engines, the altitude, the humidity and the temperature. And the visibility, of course, varies according to the time of the day.

# Design Challenges
<ul>
  <li>
Keep everything simple with as little text as possible but allowing the user to understand what that interaction or element means.
 </li>
   <li>
Making real life relations to the interaction. Example: to increase temperature one must rub the temperature button. To make the plane go up, user must tilt the device upwards in the same way a plane does.
 </li> <li>
Retaining a pleasant looking layout that was responsive, even though the sketch is designed mainly for the iPad.
</li>
  </ul>

# Code Challenges

Since none of us had plenty of experience with code, the project was divided by various small processes, each for every part of interaction. Below goes the list in a chronological order.

<ul>
  <li><p><b>Background that reacts to time of the day:</b> the code itself was not so complex but the production of the PNG image took a lot of retrials. Eventually a proportion between time and the size of colors in the background was found.
<p><img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/a413a075614125.5c51d77a5c48f.png" alt="" height="100%" width="100%">
</p>
</li><p></p>
  
  <li><b>Changing the height of the plane</b> was hard at first because it either went too fast or slow. With various IF conditioners we managed to regulate how fast the plane goes up or down. And after finishing this part it was noted that when the plane reaches top high or low altitudes a feedback response was needed. This is why, now, the plane and text becomes red in such situations.
  <p><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/8de6db75614125.5c51d77a1a51f.gif" alt="" height="19%" width="19%">
  </p></li><p></p>
  


<li><p></p><p><b>Timer based temperature:</b> since temperature returns to its regular state when the user is not pressing the button, some kind of timer had to be used. Initially there was a lot of confusion with how to achieve the desired result. But, eventually, we managed to solve it by applying a timer based on the number of times that the frameCount was divisible by a certain number. And this number was the controller of how fast the timer run.
<p><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/67242f75614125.5c51d77a1a17e.gif" alt="" height="19%" width="19%">
</p>
</li><p></p>
  
  <li><b>Number of planes:</b> we initially wanted to show 4 types of planes, and that would require 6 particle systems. Since the sketch is already very heavy with 4 particles, the plane types were called off. Also, since the main idea of the sketch is showing how contrails work, having other plane types would be only aesthetical and not informative, so it was not a big commitment we lost after removing the planes.
  <p><img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/aee13b75614125.5c5194376687d.gif" alt="" height="100%" width="100%"></p>
</li>

<li><p></p><p><b>Changing text by tilting:</b> this was complicated on the calibration side of the things. It was complicated to set the proper angle and also the feedback time for the text to change.
<p><img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/b3745775614125.5c51d77a19997.gif" alt="" height="19%" width="19%">
</p>
</li><p></p>

</ul>


# Third Credits Libraries Used

Particles: https://p5js.org/examples/simulate-particle-system.html

# Contrail formation reference  

ContrailScience: https://science-edu.larc.nasa.gov/contrail-edu/science.html

<img src="https://i.pinimg.com/564x/9c/4b/08/9c4b085194c0e7df16a554250c9fec37.jpg" alt="" height="100%" width="100%">


