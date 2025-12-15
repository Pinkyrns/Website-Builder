export const TEMPLATE_HTML = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Ecomus</title>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
nav {
  display: flex;
  justify-content: space-between;
  padding: 16px 40px;
  border-bottom: 1px solid #eee;
}
.hero {
  position: relative;
  height: 500px;
}
.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hero h1 {
  position: absolute;
  bottom: 60px;
  left: 60px;
  color: white;
  font-size: 48px;
}
</style>
</head>

<body>
<nav>
  <h2>ECOMUS</h2>
  <div>
    <span>About</span>
    <span style="margin-left:16px">Shop</span>
    <span style="margin-left:16px">Products</span>
    <span style="margin-left:16px">Contact</span>
  </div>
</nav>

<section class="hero">
  <img src="https://images.unsplash.com/photo-1520975922215-1d2b3a81a44b" />
  <h1>Empowering women to achieve</h1>
</section>
</body>
</html>
`;
