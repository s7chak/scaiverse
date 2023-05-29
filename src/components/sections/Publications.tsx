import Navbar from "../Navbar";
import BlogCard from "../BlogCard";
import ScrollAnimation from "react-animate-on-scroll";
import Footer from "./Footer";

export const Publications = () => {
	return (
		<div className="publications">
			<section id="blogging" className="blogging section is-medium">
				<div className="blogging-container">
					<ScrollAnimation animateIn="animate__slideInDown" animateOnce={true}>
						<h1>s7chak Blogs</h1>
					</ScrollAnimation>
					<br/>
					<p className="description"><b>
						A collection of my thoughts on science, technology, AI and the world of finance.
					</b></p><br/>
					<div style={{ display: 'flex', justifyContent: 'center', width: '60vw' }}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<div className="button">
							<a href="https://medium.com/@subhayuchakravarty7" rel="noreferrer"> Medium Blogs
							</a>
							</div>
						</div>
					</div><br/><br/><br/><br/>
					<div className="columns">
						<div className="column is-multiline is-6">
							<ScrollAnimation animateIn="animate__slideInUp" animateOnce={true}>
								<BlogCard id="Wildfire_Prediction"/><br/><br/>
								<BlogCard id="Adversarial_Attack"/><br/><br/>
							</ScrollAnimation>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</div>
	);
};

export default Publications;