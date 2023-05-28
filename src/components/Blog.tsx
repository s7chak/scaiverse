import Navbar from "./Navbar";
import BlogCard from "./BlogCard";
import ScrollAnimation from "react-animate-on-scroll";

export const Blogs = () => {
	return (
		<div className="blogs">
		<section id="blogging" className="blogging section is-medium">
			<div className="blogging-container">
				<h1>s7chak Blogs</h1>
				<br/>
				<p className="description"><b>
				A collection of my thoughts on technology, optimizations and the world of finance.
				</b></p><br/>
				<div className="columns">
					<div className="column is-multiline is-6">
					<ScrollAnimation animateIn="animate__slideInUp" animateOnce={true}>
						<BlogCard id="Wildfire_Prediction"/>
						<BlogCard id="Adversarial_Attack"/>
					</ScrollAnimation>
					</div>
					{/* <div className="column is-multiline is-6">
						<BlogCard username="s7chak" repository="4DByD" />
						<BlogCard username="s7chak" repository="vision-api-app" />
					</div> */}
				</div>
			</div>
		</section>
		</div>
	);
};

export default Blogs;