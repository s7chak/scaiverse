import { motion } from "framer-motion";

function MyLogoBar() {
  const handleClick = () => {
    window.location.href = "https://scaiverse.com";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
      className="nav-logo-bar"
    >
      <nav>
        <img
          className="s7img main"
          src="assets/files/s2.png"
          alt="Scaiverse"
          onClick={handleClick}
        />
      </nav>
    </motion.div>
  );
}

export default MyLogoBar;
