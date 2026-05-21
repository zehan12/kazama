import { useQueryState, parseAsString, parseAsInteger, parseAsBoolean, parseAsArrayOf } from '@zehankhan/kazama';
import './App.css';

function App() {
  // Sync string state
  const [query, setQuery] = useQueryState(
    'query', 
    parseAsString.withDefault('').withOptions({ throttleMs: 300 })
  );

  // Sync integer state
  const [page, setPage] = useQueryState(
    'page', 
    parseAsInteger.withDefault(1)
  );

  // Sync boolean state
  const [availableOnly, setAvailableOnly] = useQueryState(
    'availableOnly', 
    parseAsBoolean.withDefault(false)
  );

  // Sync array state
  const [categories, setCategories] = useQueryState(
    'categories', 
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const toggleCategory = (cat: string) => {
    if (categories.includes(cat)) {
      setCategories(categories.filter((c: string) => c !== cat));
    } else {
      setCategories([...categories, cat]);
    }
  };

  return (
    <div style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>URL State Management Example (Nuqs-style)</h1>
      <p style={{ color: 'gray', marginBottom: 30 }}>
        Notice how changing any of these controls instantly updates the URL, and navigating back/forward restores the exact state. 
        It supports full type-safety and Nuqs-style parsers!
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 400 }}>
        <div>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>Search Query</label>
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            style={{ padding: '8px 12px', width: '100%', borderRadius: 6, border: '1px solid #ccc' }}
          />
          <small style={{ color: 'gray' }}>Throttled by 300ms</small>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>Page</label>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setPage(Math.max(1, page - 1))}>Prev</button>
            <span style={{ alignSelf: 'center' }}>{page}</span>
            <button onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 'bold' }}>
            <input 
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
            />
            Available Only
          </label>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 'bold' }}>Categories</label>
          <div style={{ display: 'flex', gap: 10 }}>
            {['Shoes', 'Shirts', 'Pants'].map(cat => (
              <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input 
                  type="checkbox"
                  checked={categories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
