<div class="jumbotron bg-darkmode br-0 mb-0">
  <div class="container text-center  ">
    <h1 class=" txt--maxlight">Online Store</h1>      
    <p class=" txt--maxlight">Mission, Vission & Values</p>
  </div> 
</div>
<style>
  
.search-container {
	position: relative;
	display: inline-block;
	margin: 4px 2px;
	height: 50px;
	width: 50px;
	vertical-align: bottom;
}

.mglass {
	display: inline-block;
	pointer-events: none;
	-webkit-transform: rotate(-45deg);
	-moz-transform: rotate(-45deg);
	-o-transform: rotate(-45deg);
	-ms-transform: rotate(-45deg);
}

.searchbutton {
	position: absolute;
	font-size: 22px;
	width: 100%;
	margin: 0;
	padding: 0;
	border-radius: 50%;
	height: 50px;
	background: aqua;
	align-items: center;
	display: inline-grid; 
	text-align: center; 
	font-weight: bolder;
	color: white;
	background: #333;
	transition: all 0.4s;
}

.search:focus + .searchbutton {

	 border-top-right-radius: 0.65rem;
	border-bottom-right-radius: 0.65rem;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	transition-duration: 0.4s;
	-moz-transition-duration: 0.4s;
	-webkit-transition-duration: 0.4s;
	-o-transition-duration: 0.4s;
}

.search {
	position: absolute;
	right: 49px;  
	background-color: white;
	outline: none;
	border: none;
	padding: 0;
	width: 0;
	height: 100%;
	z-index: 10;

}


.search:focus {
	width: 363px; /* Bar width+1px */
	padding: 0 16px 0 0;
}

.expandright {
	right: auto;
	left: 49px;  
	border-top-right-radius: 0.65rem; 
	border-bottom-right-radius: 0.65rem;
	transition: all 0.4s;

}

.expandright:focus {
	padding: 0 0 0 16px;
	border: 1px solid #c1c0c0;
}
 
</style>