// We're Rich — Footer.
function WRFooter({ updatedAt }) {
  return (
    <footer style={{
      position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 16, flexWrap: 'wrap', paddingTop: 'var(--space-6)', marginTop: 'var(--space-4)',
      borderTop: '1px solid var(--border-hairline)',
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--text-lo)' }}>
        SetNForget Systems LLC · <span style={{ color: 'var(--green-300)' }}>we are so back</span>
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-2xs)', color: 'var(--text-faint)', letterSpacing: '0.06em' }}>
        UPDATED {updatedAt}
      </span>
    </footer>
  );
}
window.WRFooter = WRFooter;
