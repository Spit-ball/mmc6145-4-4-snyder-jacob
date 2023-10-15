import styles from './style.module.css'

export default function Home() {
  return (
    <main className={styles.homepage}>
      <h1>Welcome to Booker 📚</h1>
      <p>Booker is an application for researching, previewing, and shopping for books.</p>
      <p>You can also save books locally to your favorites.</p>
      <section className={styles.faq}>
        <h2>FAQ</h2>
        <p><strong>How does Booker work?</strong></p>
        <p>Booker is a <a href="http://reactjs.org">React app</a> that uses the <a href="https://developers.google.com/books/docs/v1/reference/volumes/list">Google Books API</a> to retrieve and display book information.</p>
        <p><strong>Do you make money off of Booker?</strong></p>
        <p>Nope! There are no affiliate links or any other revenue streams within Booker.</p>
        <p><strong>What's with the name? It sounds like "booger".</strong></p>
        <p>This is a sample app that doesn't need a fancy name. Also, you're gross.</p>
        <div className={styles.pyramid}>
          <p><strong>Did you intend for this text to become pyramid-shaped?</strong></p>
          <p>No, but that is a pretty cool coincidence in the copy.</p>
        </div>
      </section>
    </main>
  )
}