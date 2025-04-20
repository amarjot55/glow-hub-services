
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

export function SQLEditor() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const runQuery = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.rpc('sql', { q: query });
      
      if (error) {
        setError(error.message);
        setResult(null);
      } else {
        // Handle the data properly based on its structure
        if (data === null) {
          setResult([]);
        } else if (Array.isArray(data)) {
          setResult(data);
        } else if (typeof data === 'object') {
          // If data is a JSON object but not an array, wrap it in an array
          setResult([data]);
        } else {
          // Convert primitive values to array with a single item
          setResult([{ result: data }]);
        }
        setError(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Write your SQL query here... (Only SELECT queries are allowed)"
          className="min-h-[200px] font-mono"
        />
        <Button 
          onClick={runQuery} 
          disabled={loading || !query.trim()}
          className="w-full md:w-auto"
        >
          {loading ? "Running..." : "Run Query"}
        </Button>
      </div>

      {error && (
        <div className="p-4 border border-red-200 bg-red-50 text-red-600 rounded">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-2">
          <h3 className="font-medium">Results:</h3>
          <pre className="p-4 bg-gray-50 rounded overflow-auto max-h-[400px] font-mono text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
