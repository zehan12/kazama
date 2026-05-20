import { Metadata } from "next"
import { ApiTable, ApiRow } from "@/components/ui/api-table"

export const metadata: Metadata = {
  title: "API Reference | Kizuna",
  description: "Complete API reference for kizuna",
}

export default function ApiReferencePage() {
  return (
    <div className="max-w-4xl mx-auto py-10 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <p className="text-sm font-mono text-dim mb-4">api</p>
        <h1 className="text-4xl font-bold text-fg mb-4 tracking-tight">Core API</h1>
        <p className="text-lg text-muted max-w-2xl leading-relaxed">
          Every function, hook, configuration object, and default. The complete technical reference for <code className="text-sm bg-surface px-1.5 py-0.5 rounded-md text-fg">kizuna</code>.
        </p>
      </div>

      <div className="space-y-12">
        {/* createStore API */}
        <section>
          <div className="font-mono text-[13px] text-[#888] mb-3">createStore</div>
          <ApiTable>
            <ApiRow
              prop="models"
              required
              type="Record<string, Model>"
              description={
                <span>
                  An object defining your state models. Each model must have a <code className="bg-surface px-1 py-0.5 rounded">state</code>, and optionally <code className="bg-surface px-1 py-0.5 rounded">reducers</code> and <code className="bg-surface px-1 py-0.5 rounded">effects</code>.
                </span>
              }
            />
            <ApiRow
              prop="config.name"
              type="string"
              description="A name for the store, used primarily for Redux DevTools identification."
              defaultValue='"Kizuna"'
            />
            <ApiRow
              prop="config.persist"
              type="PersistConfig"
              description={
                <div className="flex flex-col gap-2">
                  <span>Configuration for automatic state persistence.</span>
                  <code className="text-xs text-dim block mt-1">{`{ key: string, storage?: 'localStorage' | 'sessionStorage', allowlist?: string[] }`}</code>
                </div>
              }
              defaultValue="-"
            />
            <ApiRow
              prop="config.request"
              type="AxiosInstance | Function"
              description="A custom request client instance that will be automatically passed as the third argument to all effect functions."
              defaultValue="-"
            />
          </ApiTable>
        </section>

        {/* createModel API */}
        <section>
          <div className="font-mono text-[13px] text-[#888] mb-3">createModel</div>
          <ApiTable>
            <ApiRow
              prop="model"
              required
              type="Model<State, Reducers, Effects>"
              description="An object defining the state, reducers, and effects for a given model. This is an identity function primarily used to provide strict TypeScript inference without having to inline your entire store object."
            />
          </ApiTable>
        </section>

        {/* useModel API */}
        <section>
          <div className="font-mono text-[13px] text-[#888] mb-3">useModel</div>
          <ApiTable>
            <ApiRow
              prop="modelKey"
              required
              type="string"
              description="The exact string key of the model you defined in createStore."
            />
            <ApiRow
              prop="Return[0]"
              type="State"
              description="The reactive state object for the specified model. Updates to this state trigger a re-render."
              defaultValue="-"
            />
            <ApiRow
              prop="Return[1]"
              type="Dispatchers"
              description="An object containing all reducers and effects bound to this model. Calling these functions directly mutates the state."
              defaultValue="-"
            />
          </ApiTable>
        </section>

        {/* useQueryState API */}
        <section>
          <div className="font-mono text-[13px] text-[#888] mb-3">useQueryState</div>
          <ApiTable>
            <ApiRow
              prop="key"
              required
              type="string"
              description="The URL query parameter key (e.g., ?search=foo)."
            />
            <ApiRow
              prop="options.defaultValue"
              type="any"
              description="The default value to use if the query parameter is not present in the URL."
              defaultValue="undefined"
            />
            <ApiRow
              prop="options.parse"
              type="(value: string) => any"
              description="A parser function to convert the raw URL string into a strongly-typed format (like an integer or boolean)."
              defaultValue="(v) => v"
            />
            <ApiRow
              prop="options.serialize"
              type="(value: any) => string"
              description="A function to convert the typed state back into a URL-friendly string."
              defaultValue="String(v)"
            />
          </ApiTable>
        </section>

        {/* useLoader API */}
        <section>
          <div className="font-mono text-[13px] text-[#888] mb-3">useLoader</div>
          <ApiTable>
            <ApiRow
              prop="key"
              required
              type="string[]"
              description="A unique array identifying the request. Used as the cache key."
            />
            <ApiRow
              prop="loader"
              required
              type="() => Promise<any>"
              description="The asynchronous function that fetches and returns the data."
            />
            <ApiRow
              prop="maxAge"
              type="number"
              description="Time in milliseconds before the cached data is considered stale."
              defaultValue="0"
            />
            <ApiRow
              prop="revalidateOnFocus"
              type="boolean"
              description="Whether to automatically trigger a background refetch when the window regains focus."
              defaultValue="true"
            />
            <ApiRow
              prop="suspense"
              type="boolean"
              description="Whether to integrate with React Suspense (throws the promise during initial load)."
              defaultValue="false"
            />
          </ApiTable>
        </section>

        {/* useAction API */}
        <section>
          <div className="font-mono text-[13px] text-[#888] mb-3">useAction</div>
          <ApiTable>
            <ApiRow
              prop="actionFn"
              required
              type="(variables: any) => Promise<any>"
              description="The asynchronous function to execute."
            />
            <ApiRow
              prop="Return.mutate"
              type="(variables, options?) => Promise<any>"
              description="A function that triggers the action. Accepts onSuccess and onError callbacks in the options object."
              defaultValue="-"
            />
            <ApiRow
              prop="Return.isLoading"
              type="boolean"
              description="True while the action is currently executing."
              defaultValue="false"
            />
            <ApiRow
              prop="Return.error"
              type="Error | null"
              description="Contains the error object if the action promise rejects."
              defaultValue="null"
            />
          </ApiTable>
        </section>

        {/* request API */}
        <section>
          <div className="font-mono text-[13px] text-[#888] mb-3">request</div>
          <ApiTable>
            <ApiRow
              prop="options"
              required
              type="string | RequestConfig"
              description="The URL string or an Axios Request Config object containing method, url, data, etc."
            />
            <ApiRow
              prop="config.instanceName"
              type="string"
              description="The name of the specific request instance to use (if managing multiple instances)."
              defaultValue='"default"'
            />
            <ApiRow
              prop="config.withFullResponse"
              type="boolean"
              description="If true, returns the complete Axios response object instead of automatically unwrapping response.data."
              defaultValue="false"
            />
          </ApiTable>
        </section>

        {/* setRequestInstance API */}
        <section>
          <div className="font-mono text-[13px] text-[#888] mb-3">setRequestInstance</div>
          <ApiTable>
            <ApiRow
              prop="requestConfig"
              required
              type="AxiosRequestConfig & { interceptors? }"
              description="Global configuration and interceptors to apply to the HTTP request instance."
            />
            <ApiRow
              prop="requestInstance"
              type="AxiosInstance"
              description="An optional specific axios instance to mutate. Defaults to the global 'default' instance."
              defaultValue="-"
            />
          </ApiTable>
        </section>

        {/* parsers API */}
        <section>
          <div className="font-mono text-[13px] text-[#888] mb-3">parsers</div>
          <ApiTable>
            <ApiRow
              prop="parseAsString"
              type="Parser<string>"
              description="Passes through strings directly from URL parameters."
            />
            <ApiRow
              prop="parseAsInteger"
              type="Parser<number>"
              description="Parses the URL string into an integer using parseInt."
            />
            <ApiRow
              prop="parseAsFloat"
              type="Parser<number>"
              description="Parses the URL string into a floating-point number using parseFloat."
            />
            <ApiRow
              prop="parseAsBoolean"
              type="Parser<boolean>"
              description="Parses 'true' into the boolean true, and anything else as false."
            />
            <ApiRow
              prop="parseAsJson"
              type="Parser<any>"
              description="Safely attempts to JSON.parse() the query parameter."
            />
            <ApiRow
              prop="parseAsArrayOf"
              type="(parser: Parser, separator?: string) => Parser"
              description="Creates a parser that splits a delimited string (default ',') and applies the given parser to each element."
            />
          </ApiTable>
        </section>
      </div>
    </div>
  )
}
