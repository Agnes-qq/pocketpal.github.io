export function SiteFooter({ year = '2026' }) {
  return (
    <footer>
      <div className="container">
        <div className="col-lg-12">
          <p>Copyright © {year} PocketPal Revolution Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
