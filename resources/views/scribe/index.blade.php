<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>Laravel API Documentation</title>

    <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="{{ asset("/vendor/scribe/css/theme-default.style.css") }}" media="screen">
    <link rel="stylesheet" href="{{ asset("/vendor/scribe/css/theme-default.print.css") }}" media="print">

    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min.js"></script>

    <link rel="stylesheet"
          href="https://unpkg.com/@highlightjs/cdn-assets@11.6.0/styles/obsidian.min.css">
    <script src="https://unpkg.com/@highlightjs/cdn-assets@11.6.0/highlight.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jets/0.14.1/jets.min.js"></script>

    <style id="language-style">
        /* starts out as display none and is replaced with js later  */
                    body .content .bash-example code { display: none; }
                    body .content .javascript-example code { display: none; }
            </style>

    <script>
        var tryItOutBaseUrl = "http://localhost";
        var useCsrf = Boolean();
        var csrfUrl = "/sanctum/csrf-cookie";
    </script>
    <script src="{{ asset("/vendor/scribe/js/tryitout-5.11.0.js") }}"></script>

    <script src="{{ asset("/vendor/scribe/js/theme-default-5.11.0.js") }}"></script>

</head>

<body data-languages="[&quot;bash&quot;,&quot;javascript&quot;]">

<a href="#" id="nav-button">
    <span>
        MENU
        <img src="{{ asset("/vendor/scribe/images/navbar.png") }}" alt="navbar-image"/>
    </span>
</a>
<div class="tocify-wrapper">
    
            <div class="lang-selector">
                                            <button type="button" class="lang-button" data-language-name="bash">bash</button>
                                            <button type="button" class="lang-button" data-language-name="javascript">javascript</button>
                    </div>
    
    <div class="search">
        <input type="text" class="search" id="input-search" placeholder="Search">
    </div>

    <div id="toc">
                    <ul id="tocify-header-introduction" class="tocify-header">
                <li class="tocify-item level-1" data-unique="introduction">
                    <a href="#introduction">Introduction</a>
                </li>
                            </ul>
                    <ul id="tocify-header-authenticating-requests" class="tocify-header">
                <li class="tocify-item level-1" data-unique="authenticating-requests">
                    <a href="#authenticating-requests">Authenticating requests</a>
                </li>
                            </ul>
                    <ul id="tocify-header-endpoints" class="tocify-header">
                <li class="tocify-item level-1" data-unique="endpoints">
                    <a href="#endpoints">Endpoints</a>
                </li>
                                    <ul id="tocify-subheader-endpoints" class="tocify-subheader">
                                                    <li class="tocify-item level-2" data-unique="endpoints-GETapi-user">
                                <a href="#endpoints-GETapi-user">GET api/user</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTapi-jobs">
                                <a href="#endpoints-POSTapi-jobs">POST api/jobs</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETjobs--id-">
                                <a href="#endpoints-GETjobs--id-">GET jobs/{id}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETjobs">
                                <a href="#endpoints-GETjobs">Display a listing of the resource.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETjobs--id-">
                                <a href="#endpoints-GETjobs--id-">Display the specified resource.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETprofile">
                                <a href="#endpoints-GETprofile">Display the user's profile form.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-DELETEprofile">
                                <a href="#endpoints-DELETEprofile">Delete the user's account.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETadmin-users">
                                <a href="#endpoints-GETadmin-users">GET admin/users</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETadmin-users-create">
                                <a href="#endpoints-GETadmin-users-create">GET admin/users/create</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTadmin-users">
                                <a href="#endpoints-POSTadmin-users">POST admin/users</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PUTadmin-users--id-">
                                <a href="#endpoints-PUTadmin-users--id-">PUT admin/users/{id}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-DELETEadmin-users--id-">
                                <a href="#endpoints-DELETEadmin-users--id-">DELETE admin/users/{id}</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-PATCHadmin-users--id--changeRole">
                                <a href="#endpoints-PATCHadmin-users--id--changeRole">PATCH admin/users/{id}/changeRole</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-DELETEadmin-jobs--id-">
                                <a href="#endpoints-DELETEadmin-jobs--id-">Remove the specified resource from storage.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETregister">
                                <a href="#endpoints-GETregister">Display the registration view.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTregister">
                                <a href="#endpoints-POSTregister">Handle an incoming registration request.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-GETlogin">
                                <a href="#endpoints-GETlogin">Display the login view.</a>
                            </li>
                                                                                <li class="tocify-item level-2" data-unique="endpoints-POSTlogin">
                                <a href="#endpoints-POSTlogin">Handle an incoming authentication request.</a>
                            </li>
                                                                        </ul>
                            </ul>
            </div>

    <ul class="toc-footer" id="toc-footer">
                    <li style="padding-bottom: 5px;"><a href="{{ route("scribe.postman") }}">View Postman collection</a></li>
                            <li style="padding-bottom: 5px;"><a href="{{ route("scribe.openapi") }}">View OpenAPI spec</a></li>
                <li><a href="http://github.com/knuckleswtf/scribe">Documentation powered by Scribe ✍</a></li>
    </ul>

    <ul class="toc-footer" id="last-updated">
        <li>Last updated: July 22, 2026</li>
    </ul>
</div>

<div class="page-wrapper">
    <div class="dark-box"></div>
    <div class="content">
        <h1 id="introduction">Introduction</h1>
<aside>
    <strong>Base URL</strong>: <code>http://localhost</code>
</aside>
<pre><code>This documentation aims to provide all the information you need to work with our API.

&lt;aside&gt;As you scroll, you'll see code examples for working with the API in different programming languages in the dark area to the right (or as part of the content on mobile).
You can switch the language used with the tabs at the top right (or from the nav menu at the top left on mobile).&lt;/aside&gt;</code></pre>

        <h1 id="authenticating-requests">Authenticating requests</h1>
<p>This API is not authenticated.</p>

        <h1 id="endpoints">Endpoints</h1>

    

                                <h2 id="endpoints-GETapi-user">GET api/user</h2>

<p>
</p>



<span id="example-requests-GETapi-user">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://localhost/api/user" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/user"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETapi-user">
            <blockquote>
            <p>Example response (401):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
access-control-allow-origin: *
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">{
    &quot;message&quot;: &quot;Unauthenticated.&quot;
}</code>
 </pre>
    </span>
<span id="execution-results-GETapi-user" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETapi-user"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETapi-user"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETapi-user" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETapi-user">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETapi-user" data-method="GET"
      data-path="api/user"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETapi-user', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETapi-user"
                    onclick="tryItOut('GETapi-user');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETapi-user"
                    onclick="cancelTryOut('GETapi-user');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETapi-user"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>api/user</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETapi-user"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETapi-user"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTapi-jobs">POST api/jobs</h2>

<p>
</p>



<span id="example-requests-POSTapi-jobs">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://localhost/api/jobs" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"title\": \"b\",
    \"description\": \"Eius et animi quos velit et.\",
    \"source_external_id\": \"v\",
    \"source_internal_id\": \"d\",
    \"company_id\": \"l\",
    \"location\": \"j\",
    \"salary_min\": 4326.41688,
    \"salary_max\": 4326.41688,
    \"contract_type\": \"m\",
    \"is_remote\": false
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://localhost/api/jobs"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "title": "b",
    "description": "Eius et animi quos velit et.",
    "source_external_id": "v",
    "source_internal_id": "d",
    "company_id": "l",
    "location": "j",
    "salary_min": 4326.41688,
    "salary_max": 4326.41688,
    "contract_type": "m",
    "is_remote": false
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTapi-jobs">
</span>
<span id="execution-results-POSTapi-jobs" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTapi-jobs"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTapi-jobs"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTapi-jobs" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTapi-jobs">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTapi-jobs" data-method="POST"
      data-path="api/jobs"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTapi-jobs', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTapi-jobs"
                    onclick="tryItOut('POSTapi-jobs');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTapi-jobs"
                    onclick="cancelTryOut('POSTapi-jobs');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTapi-jobs"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>api/jobs</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTapi-jobs"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTapi-jobs"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>title</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="title"                data-endpoint="POSTapi-jobs"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>description</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="description"                data-endpoint="POSTapi-jobs"
               value="Eius et animi quos velit et."
               data-component="body">
    <br>
<p>Example: <code>Eius et animi quos velit et.</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>source_external_id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="source_external_id"                data-endpoint="POSTapi-jobs"
               value="v"
               data-component="body">
    <br>
<p>Must be a valid URL. Must not be greater than 255 characters. Example: <code>v</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>source_internal_id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="source_internal_id"                data-endpoint="POSTapi-jobs"
               value="d"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>d</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>company_id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="company_id"                data-endpoint="POSTapi-jobs"
               value="l"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>l</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>location</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="location"                data-endpoint="POSTapi-jobs"
               value="j"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>j</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>salary_min</code></b>&nbsp;&nbsp;
<small>number</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="salary_min"                data-endpoint="POSTapi-jobs"
               value="4326.41688"
               data-component="body">
    <br>
<p>Example: <code>4326.41688</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>salary_max</code></b>&nbsp;&nbsp;
<small>number</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="salary_max"                data-endpoint="POSTapi-jobs"
               value="4326.41688"
               data-component="body">
    <br>
<p>Example: <code>4326.41688</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>contract_type</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="contract_type"                data-endpoint="POSTapi-jobs"
               value="m"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>m</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>is_remote</code></b>&nbsp;&nbsp;
<small>boolean</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <label data-endpoint="POSTapi-jobs" style="display: none">
            <input type="radio" name="is_remote"
                   value="true"
                   data-endpoint="POSTapi-jobs"
                   data-component="body"             >
            <code>true</code>
        </label>
        <label data-endpoint="POSTapi-jobs" style="display: none">
            <input type="radio" name="is_remote"
                   value="false"
                   data-endpoint="POSTapi-jobs"
                   data-component="body"             >
            <code>false</code>
        </label>
    <br>
<p>Example: <code>false</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETjobs--id-">GET jobs/{id}</h2>

<p>
</p>



<span id="example-requests-GETjobs--id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://localhost/jobs/16" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://localhost/jobs/16"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETjobs--id-">
            <blockquote>
            <p>Example response (404):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
set-cookie: XSRF-TOKEN=eyJpdiI6IjVSY0dUWGRwUkZHRlFiaW1Yb29yd1E9PSIsInZhbHVlIjoiM3paL2g2OUFxOSt0dTJRcWUxNmxrVTY4LzlsUzNGR2kyZFB1R21FMllidFk5SDluOUR4YW15akI1a3VZeVZPSm1LdW14aElnc1lkQWZiM3RHWjFHUG5BelJ4QUQ1YmhWNGJvWmExVkg1MzRnbUxkSEYwZkt1ZzlqMlNEdGVGbGMiLCJtYWMiOiJmM2I0ZmRiMGQ5YmU1NGIwMTI5MjZjNTA0ODk1NGVlNzY3M2Q0YTY5ODQ3NGEyMWM1NTUwYTlkN2QwNDc1YjExIiwidGFnIjoiIn0%3D; expires=Wed, 22 Jul 2026 15:04:36 GMT; Max-Age=7200; path=/; samesite=lax; laravel-session=eyJpdiI6IndERkxsRklPVVZXUFBHS3NkTkEyNnc9PSIsInZhbHVlIjoickF3aVQ5RWxPK1R0SjhlMFhnQjlTOWxTdXVaeHBjYXk4K01DaXBpcXVDRXZmS1dVOWJNODU0amZ6Zy9lN2VJUlAvcnh5SzR0SW1QS3BsMG9uNHlUQ2ROM0tSTklBTFNFQ1RObjNRTGI4OUZtMDFCcGEyN1VpOXNNUTd6VzdnRkwiLCJtYWMiOiI1YzM2ZDIzZDU3NjM0MTJjYmNiZDYzMGY3NDIxMjczY2M5YWUwMzE4MWJmZTY4YzhlMjIxYzMyZmFmNTYyMDMxIiwidGFnIjoiIn0%3D; expires=Wed, 22 Jul 2026 15:04:36 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;utf-8&quot;&gt;
        &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;

        &lt;title&gt;Not Found&lt;/title&gt;

        &lt;style&gt;
            /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}a{background-color:transparent}code{font-family:monospace,monospace;font-size:1em}[hidden]{display:none}html{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}*,:after,:before{box-sizing:border-box;border:0 solid #e2e8f0}a{color:inherit;text-decoration:inherit}code{font-family:Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}svg,video{display:block;vertical-align:middle}video{max-width:100%;height:auto}.bg-white{--bg-opacity:1;background-color:#fff;background-color:rgba(255,255,255,var(--bg-opacity))}.bg-gray-100{--bg-opacity:1;background-color:#f7fafc;background-color:rgba(247,250,252,var(--bg-opacity))}.border-gray-200{--border-opacity:1;border-color:#edf2f7;border-color:rgba(237,242,247,var(--border-opacity))}.border-gray-400{--border-opacity:1;border-color:#cbd5e0;border-color:rgba(203,213,224,var(--border-opacity))}.border-t{border-top-width:1px}.border-r{border-right-width:1px}.flex{display:flex}.grid{display:grid}.hidden{display:none}.items-center{align-items:center}.justify-center{justify-content:center}.font-semibold{font-weight:600}.h-5{height:1.25rem}.h-8{height:2rem}.h-16{height:4rem}.text-sm{font-size:.875rem}.text-lg{font-size:1.125rem}.leading-7{line-height:1.75rem}.mx-auto{margin-left:auto;margin-right:auto}.ml-1{margin-left:.25rem}.mt-2{margin-top:.5rem}.mr-2{margin-right:.5rem}.ml-2{margin-left:.5rem}.mt-4{margin-top:1rem}.ml-4{margin-left:1rem}.mt-8{margin-top:2rem}.ml-12{margin-left:3rem}.-mt-px{margin-top:-1px}.max-w-xl{max-width:36rem}.max-w-6xl{max-width:72rem}.min-h-screen{min-height:100vh}.overflow-hidden{overflow:hidden}.p-6{padding:1.5rem}.py-4{padding-top:1rem;padding-bottom:1rem}.px-4{padding-left:1rem;padding-right:1rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.pt-8{padding-top:2rem}.fixed{position:fixed}.relative{position:relative}.top-0{top:0}.right-0{right:0}.shadow{box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)}.text-center{text-align:center}.text-gray-200{--text-opacity:1;color:#edf2f7;color:rgba(237,242,247,var(--text-opacity))}.text-gray-300{--text-opacity:1;color:#e2e8f0;color:rgba(226,232,240,var(--text-opacity))}.text-gray-400{--text-opacity:1;color:#cbd5e0;color:rgba(203,213,224,var(--text-opacity))}.text-gray-500{--text-opacity:1;color:#a0aec0;color:rgba(160,174,192,var(--text-opacity))}.text-gray-600{--text-opacity:1;color:#718096;color:rgba(113,128,150,var(--text-opacity))}.text-gray-700{--text-opacity:1;color:#4a5568;color:rgba(74,85,104,var(--text-opacity))}.text-gray-900{--text-opacity:1;color:#1a202c;color:rgba(26,32,44,var(--text-opacity))}.uppercase{text-transform:uppercase}.underline{text-decoration:underline}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.tracking-wider{letter-spacing:.05em}.w-5{width:1.25rem}.w-8{width:2rem}.w-auto{width:auto}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}@-webkit-keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@-webkit-keyframes ping{0%{transform:scale(1);opacity:1}75%,to{transform:scale(2);opacity:0}}@keyframes ping{0%{transform:scale(1);opacity:1}75%,to{transform:scale(2);opacity:0}}@-webkit-keyframes pulse{0%,to{opacity:1}50%{opacity:.5}}@keyframes pulse{0%,to{opacity:1}50%{opacity:.5}}@-webkit-keyframes bounce{0%,to{transform:translateY(-25%);-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:translateY(0);-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1)}}@keyframes bounce{0%,to{transform:translateY(-25%);-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:translateY(0);-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1)}}@media (min-width:640px){.sm\:rounded-lg{border-radius:.5rem}.sm\:block{display:block}.sm\:items-center{align-items:center}.sm\:justify-start{justify-content:flex-start}.sm\:justify-between{justify-content:space-between}.sm\:h-20{height:5rem}.sm\:ml-0{margin-left:0}.sm\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\:pt-0{padding-top:0}.sm\:text-left{text-align:left}.sm\:text-right{text-align:right}}@media (min-width:768px){.md\:border-t-0{border-top-width:0}.md\:border-l{border-left-width:1px}.md\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (min-width:1024px){.lg\:px-8{padding-left:2rem;padding-right:2rem}}@media (prefers-color-scheme:dark){.dark\:bg-gray-800{--bg-opacity:1;background-color:#2d3748;background-color:rgba(45,55,72,var(--bg-opacity))}.dark\:bg-gray-900{--bg-opacity:1;background-color:#1a202c;background-color:rgba(26,32,44,var(--bg-opacity))}.dark\:border-gray-700{--border-opacity:1;border-color:#4a5568;border-color:rgba(74,85,104,var(--border-opacity))}.dark\:text-white{--text-opacity:1;color:#fff;color:rgba(255,255,255,var(--text-opacity))}.dark\:text-gray-300 { --text-opacity: 1; color: #e2e8f0; color: rgba(226,232,240,var(--text-opacity)) }}
        &lt;/style&gt;

        &lt;style&gt;
            body {
                font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;
            }
        &lt;/style&gt;
    &lt;/head&gt;
    &lt;body class=&quot;antialiased bg-white text-black&quot;&gt;
        &lt;div class=&quot;relative flex items-top justify-center min-h-screen bg-white text-black sm:items-center sm:pt-0&quot; role=&quot;main&quot;&gt;
            &lt;div class=&quot;max-w-xl mx-auto sm:px-6 lg:px-8&quot;&gt;
                &lt;div class=&quot;flex items-center pt-8 sm:justify-start sm:pt-0&quot;&gt;
                    &lt;h1 class=&quot;px-4 text-lg text-black border-r border-gray-400&quot;&gt;
                        404                    &lt;/h1&gt;

                    &lt;div class=&quot;ml-4 text-lg text-black&quot;&gt;
                        Not Found                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code>
 </pre>
    </span>
<span id="execution-results-GETjobs--id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETjobs--id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETjobs--id-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETjobs--id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETjobs--id-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETjobs--id-" data-method="GET"
      data-path="jobs/{id}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETjobs--id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETjobs--id-"
                    onclick="tryItOut('GETjobs--id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETjobs--id-"
                    onclick="cancelTryOut('GETjobs--id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETjobs--id-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>jobs/{id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETjobs--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETjobs--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="id"                data-endpoint="GETjobs--id-"
               value="16"
               data-component="url">
    <br>
<p>The ID of the job. Example: <code>16</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETjobs">Display a listing of the resource.</h2>

<p>
</p>



<span id="example-requests-GETjobs">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://localhost/jobs" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://localhost/jobs"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETjobs">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
link: &lt;http://localhost/build/assets/app-Dukl0do2.css&gt;; rel=&quot;preload&quot;; as=&quot;style&quot;, &lt;http://localhost/build/assets/app-BaqHKurI.js&gt;; rel=&quot;modulepreload&quot;; as=&quot;script&quot;
vary: X-Inertia
set-cookie: XSRF-TOKEN=eyJpdiI6IlV0TS8wMUg2c1ZheklHRU91WEZlcnc9PSIsInZhbHVlIjoiZDJQWnIyZ0hSYlNKMFNWc2xoc29HQm01ZDRiRzZNS3hvc1JPV1N6cVhBd1NueW5YWFZWQ0RickpIeXJ2T0VMbWh0WnVQaDh2aW9wbER1cFBja1dUa21HS3pOdFl5Tm9DczJwMVpRVkVRNWE1elN4cWVNb3Q4NHRaU0VUNyt5VXciLCJtYWMiOiJiNmVkNjgwMzViMTMxMDBkYzI2M2E2ZDk0ZjY5OThjNjVhZTkzYzZkODMxZmJiYTgyZmIwZDFlYjAyODZhOTNkIiwidGFnIjoiIn0%3D; expires=Wed, 22 Jul 2026 15:04:36 GMT; Max-Age=7200; path=/; samesite=lax; laravel-session=eyJpdiI6Ii9PT3pyZURac21KUHpaTHNIaDMvNmc9PSIsInZhbHVlIjoiYVFqQXVzYWRKS2h4WVQ3RXVHRHhEUmhuaE55WXhkVlg1TGNaWUp6NlBEMEt1OTZDZE1RRjVDbWgvNjZwekM5NTJ3bkZXa0Z5M3A1ek41ekdVTjdtSmRvcG9mRDRCakxsRkFNeUhvOExHNHVOaGpaUVJrdjlIeEVZL3ZieGQ0VjYiLCJtYWMiOiJjOTAzYmY5OGY1NDgxNmE4NGNlMDg4YjY1ZjkyNDlkYzJkZWJiNThkZjJhNjE4MjljYWY2NGY1ZTFlOTUyOGIyIiwidGFnIjoiIn0%3D; expires=Wed, 22 Jul 2026 15:04:36 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;utf-8&quot;&gt;
        &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;

        &lt;title inertia&gt;Laravel&lt;/title&gt;

        &lt;!-- Fonts --&gt;
        &lt;link rel=&quot;preconnect&quot; href=&quot;https://fonts.googleapis.com&quot;&gt;
        &lt;link rel=&quot;preconnect&quot; href=&quot;https://fonts.gstatic.com&quot; crossorigin&gt;
        &lt;link href=&quot;https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&amp;family=Inter:wght@400;500;600&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap&quot; rel=&quot;stylesheet&quot;&gt;
        &lt;link href=&quot;https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap&quot; rel=&quot;stylesheet&quot;&gt;

        &lt;!-- Scripts --&gt;
        &lt;script type=&quot;text/javascript&quot;&gt;const Ziggy={&quot;url&quot;:&quot;http:\/\/localhost&quot;,&quot;port&quot;:null,&quot;defaults&quot;:{},&quot;routes&quot;:{&quot;debugbar.openhandler&quot;:{&quot;uri&quot;:&quot;_debugbar\/open&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;debugbar.cache.delete&quot;:{&quot;uri&quot;:&quot;_debugbar\/cache\/{key}&quot;,&quot;methods&quot;:[&quot;DELETE&quot;],&quot;wheres&quot;:{&quot;key&quot;:&quot;.*&quot;},&quot;parameters&quot;:[&quot;key&quot;]},&quot;debugbar.queries.explain&quot;:{&quot;uri&quot;:&quot;_debugbar\/queries\/explain&quot;,&quot;methods&quot;:[&quot;POST&quot;]},&quot;debugbar.clockwork&quot;:{&quot;uri&quot;:&quot;_debugbar\/clockwork\/{id}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;parameters&quot;:[&quot;id&quot;]},&quot;debugbar.assets&quot;:{&quot;uri&quot;:&quot;_debugbar\/assets&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;debugbar.telescope&quot;:{&quot;uri&quot;:&quot;_debugbar\/telescope\/{id}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;parameters&quot;:[&quot;id&quot;]},&quot;scribe&quot;:{&quot;uri&quot;:&quot;docs&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;scribe.postman&quot;:{&quot;uri&quot;:&quot;docs.postman&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;scribe.openapi&quot;:{&quot;uri&quot;:&quot;docs.openapi&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;sanctum.csrf-cookie&quot;:{&quot;uri&quot;:&quot;sanctum\/csrf-cookie&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;telescope&quot;:{&quot;uri&quot;:&quot;telescope\/{view?}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;wheres&quot;:{&quot;view&quot;:&quot;(.*)&quot;},&quot;parameters&quot;:[&quot;view&quot;]},&quot;jobs.show&quot;:{&quot;uri&quot;:&quot;jobs\/{job}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;parameters&quot;:[&quot;job&quot;],&quot;bindings&quot;:{&quot;job&quot;:&quot;id&quot;}},&quot;dashboard&quot;:{&quot;uri&quot;:&quot;dashboard&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;jobs.index&quot;:{&quot;uri&quot;:&quot;jobs&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;profile.edit&quot;:{&quot;uri&quot;:&quot;profile&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;profile.update&quot;:{&quot;uri&quot;:&quot;profile&quot;,&quot;methods&quot;:[&quot;PATCH&quot;]},&quot;profile.destroy&quot;:{&quot;uri&quot;:&quot;profile&quot;,&quot;methods&quot;:[&quot;DELETE&quot;]},&quot;admin.users.index&quot;:{&quot;uri&quot;:&quot;admin\/users&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;admin.users.create&quot;:{&quot;uri&quot;:&quot;admin\/users\/create&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;admin.users.store&quot;:{&quot;uri&quot;:&quot;admin\/users&quot;,&quot;methods&quot;:[&quot;POST&quot;]},&quot;admin.users.update&quot;:{&quot;uri&quot;:&quot;admin\/users\/{id}&quot;,&quot;methods&quot;:[&quot;PUT&quot;],&quot;parameters&quot;:[&quot;id&quot;]},&quot;admin.users.destroy&quot;:{&quot;uri&quot;:&quot;admin\/users\/{id}&quot;,&quot;methods&quot;:[&quot;DELETE&quot;],&quot;parameters&quot;:[&quot;id&quot;]},&quot;admin.users.changeRole&quot;:{&quot;uri&quot;:&quot;admin\/users\/{id}\/changeRole&quot;,&quot;methods&quot;:[&quot;PATCH&quot;],&quot;parameters&quot;:[&quot;id&quot;]},&quot;admin.jobs.destroy&quot;:{&quot;uri&quot;:&quot;admin\/jobs\/{id}&quot;,&quot;methods&quot;:[&quot;DELETE&quot;],&quot;parameters&quot;:[&quot;id&quot;]},&quot;register&quot;:{&quot;uri&quot;:&quot;register&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;login&quot;:{&quot;uri&quot;:&quot;login&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;password.request&quot;:{&quot;uri&quot;:&quot;forgot-password&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;password.email&quot;:{&quot;uri&quot;:&quot;forgot-password&quot;,&quot;methods&quot;:[&quot;POST&quot;]},&quot;password.reset&quot;:{&quot;uri&quot;:&quot;reset-password\/{token}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;parameters&quot;:[&quot;token&quot;]},&quot;password.store&quot;:{&quot;uri&quot;:&quot;reset-password&quot;,&quot;methods&quot;:[&quot;POST&quot;]},&quot;verification.notice&quot;:{&quot;uri&quot;:&quot;verify-email&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;verification.verify&quot;:{&quot;uri&quot;:&quot;verify-email\/{id}\/{hash}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;parameters&quot;:[&quot;id&quot;,&quot;hash&quot;]},&quot;verification.send&quot;:{&quot;uri&quot;:&quot;email\/verification-notification&quot;,&quot;methods&quot;:[&quot;POST&quot;]},&quot;password.confirm&quot;:{&quot;uri&quot;:&quot;confirm-password&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;password.update&quot;:{&quot;uri&quot;:&quot;password&quot;,&quot;methods&quot;:[&quot;PUT&quot;]},&quot;logout&quot;:{&quot;uri&quot;:&quot;logout&quot;,&quot;methods&quot;:[&quot;POST&quot;]},&quot;storage.local&quot;:{&quot;uri&quot;:&quot;storage\/{path}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;wheres&quot;:{&quot;path&quot;:&quot;.*&quot;},&quot;parameters&quot;:[&quot;path&quot;]},&quot;storage.local.upload&quot;:{&quot;uri&quot;:&quot;storage\/{path}&quot;,&quot;methods&quot;:[&quot;PUT&quot;],&quot;wheres&quot;:{&quot;path&quot;:&quot;.*&quot;},&quot;parameters&quot;:[&quot;path&quot;]}}};!function(t,e){&quot;object&quot;==typeof exports&amp;&amp;&quot;undefined&quot;!=typeof module?module.exports=e():&quot;function&quot;==typeof define&amp;&amp;define.amd?define(e):(t||self).route=e()}(this,function(){function t(t,e){for(var n=0;n&lt;e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,&quot;value&quot;in r&amp;&amp;(r.writable=!0),Object.defineProperty(t,u(r.key),r)}}function e(e,n,r){return n&amp;&amp;t(e.prototype,n),r&amp;&amp;t(e,r),Object.defineProperty(e,&quot;prototype&quot;,{writable:!1}),e}function n(){return n=Object.assign?Object.assign.bind():function(t){for(var e=1;e&lt;arguments.length;e++){var n=arguments[e];for(var r in n)({}).hasOwnProperty.call(n,r)&amp;&amp;(t[r]=n[r])}return t},n.apply(null,arguments)}function r(t){return r=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},r(t)}function o(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(t){}return(o=function(){return!!t})()}function i(t,e){return i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},i(t,e)}function u(t){var e=function(t){if(&quot;object&quot;!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var n=e.call(t,&quot;string&quot;);if(&quot;object&quot;!=typeof n)return n;throw new TypeError(&quot;@@toPrimitive must return a primitive value.&quot;)}return String(t)}(t);return&quot;symbol&quot;==typeof e?e:e+&quot;&quot;}function f(t){var e=&quot;function&quot;==typeof Map?new Map:void 0;return f=function(t){if(null===t||!function(t){try{return-1!==Function.toString.call(t).indexOf(&quot;[native code]&quot;)}catch(e){return&quot;function&quot;==typeof t}}(t))return t;if(&quot;function&quot;!=typeof t)throw new TypeError(&quot;Super expression must either be null or a function&quot;);if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,n)}function n(){return function(t,e,n){if(o())return Reflect.construct.apply(null,arguments);var r=[null];r.push.apply(r,e);var u=new(t.bind.apply(t,r));return n&amp;&amp;i(u,n.prototype),u}(t,arguments,r(this).constructor)}return n.prototype=Object.create(t.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),i(n,t)},f(t)}const c=String.prototype.replace,l=/%20/g,a={RFC1738:function(t){return c.call(t,l,&quot;+&quot;)},RFC3986:function(t){return String(t)}};var s=&quot;RFC3986&quot;;const p=Object.prototype.hasOwnProperty,y=Array.isArray,d=new WeakMap;var b=function(t,e){return d.set(t,e),t};function v(t){return d.has(t)}var h=function(t){return d.get(t)},m=function(t,e){d.set(t,e)};const g=function(){const t=[];for(let e=0;e&lt;256;++e)t.push(&quot;%&quot;+((e&lt;16?&quot;0&quot;:&quot;&quot;)+e.toString(16)).toUpperCase());return t}(),w=function(t,e){const n=e&amp;&amp;e.plainObjects?Object.create(null):{};for(let e=0;e&lt;t.length;++e)void 0!==t[e]&amp;&amp;(n[e]=t[e]);return n},j=function t(e,n,r){if(!n)return e;if(&quot;object&quot;!=typeof n){if(y(e))e.push(n);else{if(!e||&quot;object&quot;!=typeof e)return[e,n];if(v(e)){var o=h(e)+1;e[o]=n,m(e,o)}else(r&amp;&amp;(r.plainObjects||r.allowPrototypes)||!p.call(Object.prototype,n))&amp;&amp;(e[n]=!0)}return e}if(!e||&quot;object&quot;!=typeof e){if(v(n)){for(var i=Object.keys(n),u=r&amp;&amp;r.plainObjects?{__proto__:null,0:e}:{0:e},f=0;f&lt;i.length;f++)u[parseInt(i[f],10)+1]=n[i[f]];return b(u,h(n)+1)}return[e].concat(n)}let c=e;return y(e)&amp;&amp;!y(n)&amp;&amp;(c=w(e,r)),y(e)&amp;&amp;y(n)?(n.forEach(function(n,o){if(p.call(e,o)){const i=e[o];i&amp;&amp;&quot;object&quot;==typeof i&amp;&amp;n&amp;&amp;&quot;object&quot;==typeof n?e[o]=t(i,n,r):e.push(n)}else e[o]=n}),e):Object.keys(n).reduce(function(e,o){const i=n[o];return e[o]=p.call(e,o)?t(e[o],i,r):i,e},c)},O=1024,E=function(t,e,n,r){if(v(t)){var o=h(t)+1;return t[o]=e,m(t,o),t}var i=[].concat(t,e);return i.length&gt;n?b(w(i,{plainObjects:r}),i.length-1):i},T=function(t,e){if(y(t)){const n=[];for(let r=0;r&lt;t.length;r+=1)n.push(e(t[r]));return n}return e(t)},R=Object.prototype.hasOwnProperty,k={brackets:function(t){return t+&quot;[]&quot;},comma:&quot;comma&quot;,indices:function(t,e){return t+&quot;[&quot;+e+&quot;]&quot;},repeat:function(t){return t}},S=Array.isArray,I=Array.prototype.push,A=function(t,e){I.apply(t,S(e)?e:[e])},D=Date.prototype.toISOString,$={addQueryPrefix:!1,allowDots:!1,allowEmptyArrays:!1,arrayFormat:&quot;indices&quot;,charset:&quot;utf-8&quot;,charsetSentinel:!1,delimiter:&quot;&amp;&quot;,encode:!0,encodeDotInKeys:!1,encoder:function(t,e,n,r,o){if(0===t.length)return t;let i=t;if(&quot;symbol&quot;==typeof t?i=Symbol.prototype.toString.call(t):&quot;string&quot;!=typeof t&amp;&amp;(i=String(t)),&quot;iso-8859-1&quot;===n)return escape(i).replace(/%u[0-9a-f]{4}/gi,function(t){return&quot;%26%23&quot;+parseInt(t.slice(2),16)+&quot;%3B&quot;});let u=&quot;&quot;;for(let t=0;t&lt;i.length;t+=O){const e=i.length&gt;=O?i.slice(t,t+O):i,n=[];for(let t=0;t&lt;e.length;++t){let r=e.charCodeAt(t);45===r||46===r||95===r||126===r||r&gt;=48&amp;&amp;r&lt;=57||r&gt;=65&amp;&amp;r&lt;=90||r&gt;=97&amp;&amp;r&lt;=122||&quot;RFC1738&quot;===o&amp;&amp;(40===r||41===r)?n[n.length]=e.charAt(t):r&lt;128?n[n.length]=g[r]:r&lt;2048?n[n.length]=g[192|r&gt;&gt;6]+g[128|63&amp;r]:r&lt;55296||r&gt;=57344?n[n.length]=g[224|r&gt;&gt;12]+g[128|r&gt;&gt;6&amp;63]+g[128|63&amp;r]:(t+=1,r=65536+((1023&amp;r)&lt;&lt;10|1023&amp;e.charCodeAt(t)),n[n.length]=g[240|r&gt;&gt;18]+g[128|r&gt;&gt;12&amp;63]+g[128|r&gt;&gt;6&amp;63]+g[128|63&amp;r])}u+=n.join(&quot;&quot;)}return u},encodeValuesOnly:!1,format:s,formatter:a[s],indices:!1,serializeDate:function(t){return D.call(t)},skipNulls:!1,strictNullHandling:!1},N={},_=function(t,e,n,r,o,i,u,f,c,l,a,s,p,y,d,b,v,h){let m=t,g=h,w=0,j=!1;for(;void 0!==(g=g.get(N))&amp;&amp;!j;){const e=g.get(t);if(w+=1,void 0!==e){if(e===w)throw new RangeError(&quot;Cyclic object value&quot;);j=!0}void 0===g.get(N)&amp;&amp;(w=0)}if(&quot;function&quot;==typeof l?m=l(e,m):m instanceof Date?m=p(m):&quot;comma&quot;===n&amp;&amp;S(m)&amp;&amp;(m=T(m,function(t){return t instanceof Date?p(t):t})),null===m){if(i)return c&amp;&amp;!b?c(e,$.encoder,v,&quot;key&quot;,y):e;m=&quot;&quot;}if(&quot;string&quot;==typeof(O=m)||&quot;number&quot;==typeof O||&quot;boolean&quot;==typeof O||&quot;symbol&quot;==typeof O||&quot;bigint&quot;==typeof O||function(t){return!(!t||&quot;object&quot;!=typeof t||!(t.constructor&amp;&amp;t.constructor.isBuffer&amp;&amp;t.constructor.isBuffer(t)))}(m))return c?[d(b?e:c(e,$.encoder,v,&quot;key&quot;,y))+&quot;=&quot;+d(c(m,$.encoder,v,&quot;value&quot;,y))]:[d(e)+&quot;=&quot;+d(String(m))];var O;const E=[];if(void 0===m)return E;let R;if(&quot;comma&quot;===n&amp;&amp;S(m))b&amp;&amp;c&amp;&amp;(m=T(m,c)),R=[{value:m.length&gt;0?m.join(&quot;,&quot;)||null:void 0}];else if(S(l))R=l;else{const t=Object.keys(m);R=a?t.sort(a):t}const k=f?e.replace(/\./g,&quot;%2E&quot;):e,I=r&amp;&amp;S(m)&amp;&amp;1===m.length?k+&quot;[]&quot;:k;if(o&amp;&amp;S(m)&amp;&amp;0===m.length)return I+&quot;[]&quot;;for(let e=0;e&lt;R.length;++e){const g=R[e],j=&quot;object&quot;==typeof g&amp;&amp;void 0!==g.value?g.value:m[g];if(u&amp;&amp;null===j)continue;const O=s&amp;&amp;f?g.replace(/\./g,&quot;%2E&quot;):g,T=S(m)?&quot;function&quot;==typeof n?n(I,O):I:I+(s?&quot;.&quot;+O:&quot;[&quot;+O+&quot;]&quot;);h.set(t,w);const k=new WeakMap;k.set(N,h),A(E,_(j,T,n,r,o,i,u,f,&quot;comma&quot;===n&amp;&amp;b&amp;&amp;S(m)?null:c,l,a,s,p,y,d,b,v,k))}return E},x=Object.prototype.hasOwnProperty,C=Array.isArray,P={allowDots:!1,allowEmptyArrays:!1,allowPrototypes:!1,allowSparse:!1,arrayLimit:20,charset:&quot;utf-8&quot;,charsetSentinel:!1,comma:!1,decodeDotInKeys:!1,decoder:function(t,e,n){const r=t.replace(/\+/g,&quot; &quot;);if(&quot;iso-8859-1&quot;===n)return r.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(r)}catch(t){return r}},delimiter:&quot;&amp;&quot;,depth:5,duplicates:&quot;combine&quot;,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},F=function(t){return t.replace(/&amp;#(\d+);/g,function(t,e){return String.fromCharCode(parseInt(e,10))})},U=function(t,e){return t&amp;&amp;&quot;string&quot;==typeof t&amp;&amp;e.comma&amp;&amp;t.indexOf(&quot;,&quot;)&gt;-1?t.split(&quot;,&quot;):t},q=function(t,e,n,r){if(!t)return;const o=n.allowDots?t.replace(/\.([^.[]+)/g,&quot;[$1]&quot;):t,i=/(\[[^[\]]*])/g;let u=n.depth&gt;0&amp;&amp;/(\[[^[\]]*])/.exec(o);const f=u?o.slice(0,u.index):o,c=[];if(f){if(!n.plainObjects&amp;&amp;x.call(Object.prototype,f)&amp;&amp;!n.allowPrototypes)return;c.push(f)}let l=0;for(;n.depth&gt;0&amp;&amp;null!==(u=i.exec(o))&amp;&amp;l&lt;n.depth;){if(l+=1,!n.plainObjects&amp;&amp;x.call(Object.prototype,u[1].slice(1,-1))&amp;&amp;!n.allowPrototypes)return;c.push(u[1])}return u&amp;&amp;c.push(&quot;[&quot;+o.slice(u.index)+&quot;]&quot;),function(t,e,n,r){let o=r?e:U(e,n);for(let e=t.length-1;e&gt;=0;--e){let r;const i=t[e];if(&quot;[]&quot;===i&amp;&amp;n.parseArrays)r=v(o)?o:n.allowEmptyArrays&amp;&amp;(&quot;&quot;===o||n.strictNullHandling&amp;&amp;null===o)?[]:E([],o,n.arrayLimit,n.plainObjects);else{r=n.plainObjects?Object.create(null):{};const t=&quot;[&quot;===i.charAt(0)&amp;&amp;&quot;]&quot;===i.charAt(i.length-1)?i.slice(1,-1):i,e=n.decodeDotInKeys?t.replace(/%2E/g,&quot;.&quot;):t,u=parseInt(e,10);n.parseArrays||&quot;&quot;!==e?!isNaN(u)&amp;&amp;i!==e&amp;&amp;String(u)===e&amp;&amp;u&gt;=0&amp;&amp;n.parseArrays&amp;&amp;u&lt;=n.arrayLimit?(r=[],r[u]=o):&quot;__proto__&quot;!==e&amp;&amp;(r[e]=o):r={0:o}}o=r}return o}(c,e,n,r)};function K(t,e){const n=function(t){if(!t)return P;if(void 0!==t.allowEmptyArrays&amp;&amp;&quot;boolean&quot;!=typeof t.allowEmptyArrays)throw new TypeError(&quot;`allowEmptyArrays` option can only be `true` or `false`, when provided&quot;);if(void 0!==t.decodeDotInKeys&amp;&amp;&quot;boolean&quot;!=typeof t.decodeDotInKeys)throw new TypeError(&quot;`decodeDotInKeys` option can only be `true` or `false`, when provided&quot;);if(null!=t.decoder&amp;&amp;&quot;function&quot;!=typeof t.decoder)throw new TypeError(&quot;Decoder has to be a function.&quot;);if(void 0!==t.charset&amp;&amp;&quot;utf-8&quot;!==t.charset&amp;&amp;&quot;iso-8859-1&quot;!==t.charset)throw new TypeError(&quot;The charset option must be either utf-8, iso-8859-1, or undefined&quot;);const e=void 0===t.charset?P.charset:t.charset,n=void 0===t.duplicates?P.duplicates:t.duplicates;if(&quot;combine&quot;!==n&amp;&amp;&quot;first&quot;!==n&amp;&amp;&quot;last&quot;!==n)throw new TypeError(&quot;The duplicates option must be either combine, first, or last&quot;);return{allowDots:void 0===t.allowDots?!0===t.decodeDotInKeys||P.allowDots:!!t.allowDots,allowEmptyArrays:&quot;boolean&quot;==typeof t.allowEmptyArrays?!!t.allowEmptyArrays:P.allowEmptyArrays,allowPrototypes:&quot;boolean&quot;==typeof t.allowPrototypes?t.allowPrototypes:P.allowPrototypes,allowSparse:&quot;boolean&quot;==typeof t.allowSparse?t.allowSparse:P.allowSparse,arrayLimit:&quot;number&quot;==typeof t.arrayLimit?t.arrayLimit:P.arrayLimit,charset:e,charsetSentinel:&quot;boolean&quot;==typeof t.charsetSentinel?t.charsetSentinel:P.charsetSentinel,comma:&quot;boolean&quot;==typeof t.comma?t.comma:P.comma,decodeDotInKeys:&quot;boolean&quot;==typeof t.decodeDotInKeys?t.decodeDotInKeys:P.decodeDotInKeys,decoder:&quot;function&quot;==typeof t.decoder?t.decoder:P.decoder,delimiter:&quot;string&quot;==typeof t.delimiter||(r=t.delimiter,&quot;[object RegExp]&quot;===Object.prototype.toString.call(r))?t.delimiter:P.delimiter,depth:&quot;number&quot;==typeof t.depth||!1===t.depth?+t.depth:P.depth,duplicates:n,ignoreQueryPrefix:!0===t.ignoreQueryPrefix,interpretNumericEntities:&quot;boolean&quot;==typeof t.interpretNumericEntities?t.interpretNumericEntities:P.interpretNumericEntities,parameterLimit:&quot;number&quot;==typeof t.parameterLimit?t.parameterLimit:P.parameterLimit,parseArrays:!1!==t.parseArrays,plainObjects:&quot;boolean&quot;==typeof t.plainObjects?t.plainObjects:P.plainObjects,strictNullHandling:&quot;boolean&quot;==typeof t.strictNullHandling?t.strictNullHandling:P.strictNullHandling};var r}(e);if(&quot;&quot;===t||null==t)return n.plainObjects?Object.create(null):{};const r=&quot;string&quot;==typeof t?function(t,e){const n={__proto__:null},r=(e.ignoreQueryPrefix?t.replace(/^\?/,&quot;&quot;):t).split(e.delimiter,Infinity===e.parameterLimit?void 0:e.parameterLimit);let o,i=-1,u=e.charset;if(e.charsetSentinel)for(o=0;o&lt;r.length;++o)0===r[o].indexOf(&quot;utf8=&quot;)&amp;&amp;(&quot;utf8=%E2%9C%93&quot;===r[o]?u=&quot;utf-8&quot;:&quot;utf8=%26%2310003%3B&quot;===r[o]&amp;&amp;(u=&quot;iso-8859-1&quot;),i=o,o=r.length);for(o=0;o&lt;r.length;++o){if(o===i)continue;const t=r[o],f=t.indexOf(&quot;]=&quot;),c=-1===f?t.indexOf(&quot;=&quot;):f+1;let l,a;-1===c?(l=e.decoder(t,P.decoder,u,&quot;key&quot;),a=e.strictNullHandling?null:&quot;&quot;):(l=e.decoder(t.slice(0,c),P.decoder,u,&quot;key&quot;),a=T(U(t.slice(c+1),e),function(t){return e.decoder(t,P.decoder,u,&quot;value&quot;)})),a&amp;&amp;e.interpretNumericEntities&amp;&amp;&quot;iso-8859-1&quot;===u&amp;&amp;(a=F(a)),t.indexOf(&quot;[]=&quot;)&gt;-1&amp;&amp;(a=C(a)?[a]:a);const s=x.call(n,l);s&amp;&amp;&quot;combine&quot;===e.duplicates?n[l]=E(n[l],a,e.arrayLimit,e.plainObjects):s&amp;&amp;&quot;last&quot;!==e.duplicates||(n[l]=a)}return n}(t,n):t;let o=n.plainObjects?Object.create(null):{};const i=Object.keys(r);for(let e=0;e&lt;i.length;++e){const u=i[e],f=q(u,r[u],n,&quot;string&quot;==typeof t);o=j(o,f,n)}return!0===n.allowSparse?o:function(t){const e=[{obj:{o:t},prop:&quot;o&quot;}],n=[];for(let t=0;t&lt;e.length;++t){const r=e[t],o=r.obj[r.prop],i=Object.keys(o);for(let t=0;t&lt;i.length;++t){const r=i[t],u=o[r];&quot;object&quot;==typeof u&amp;&amp;null!==u&amp;&amp;-1===n.indexOf(u)&amp;&amp;(e.push({obj:o,prop:r}),n.push(u))}}return function(t){for(;t.length&gt;1;){const e=t.pop(),n=e.obj[e.prop];if(y(n)){const t=[];for(let e=0;e&lt;n.length;++e)void 0!==n[e]&amp;&amp;t.push(n[e]);e.obj[e.prop]=t}}}(e),t}(o)}var Z=/*#__PURE__*/function(){function t(t,e,n){var r,o;this.name=t,this.definition=e,this.bindings=null!=(r=e.bindings)?r:{},this.wheres=null!=(o=e.wheres)?o:{},this.config=n}var n=t.prototype;return n.matchesUrl=function(t){var e,n=this;if(!this.definition.methods.includes(&quot;GET&quot;))return!1;var r=this.template.replace(/[.*+$()[\]]/g,&quot;\\$&amp;&quot;).replace(/(\/?){([^}?]*)(\??)}/g,function(t,e,r,o){var i,u=&quot;(?&lt;&quot;+r+&quot;&gt;&quot;+((null==(i=n.wheres[r])?void 0:i.replace(/(^\^)|(\$$)/g,&quot;&quot;))||&quot;[^/?]+&quot;)+&quot;)&quot;;return o?&quot;(&quot;+e+u+&quot;)?&quot;:&quot;&quot;+e+u}).replace(/^\w+:\/\//,&quot;&quot;),o=t.replace(/^\w+:\/\//,&quot;&quot;).split(&quot;?&quot;),i=o[0],u=o[1],f=null!=(e=new RegExp(&quot;^&quot;+r+&quot;/?$&quot;).exec(i))?e:new RegExp(&quot;^&quot;+r+&quot;/?$&quot;).exec(decodeURI(i));if(f){for(var c in f.groups)f.groups[c]=&quot;string&quot;==typeof f.groups[c]?decodeURIComponent(f.groups[c]):f.groups[c];return{params:f.groups,query:K(u)}}return!1},n.compile=function(t){var e=this;return this.parameterSegments.length?this.template.replace(/{([^}?]+)(\??)}/g,function(n,r,o){var i,u;if(!o&amp;&amp;[null,void 0].includes(t[r]))throw new Error(&quot;Ziggy error: &#039;&quot;+r+&quot;&#039; parameter is required for route &#039;&quot;+e.name+&quot;&#039;.&quot;);if(e.wheres[r]&amp;&amp;!new RegExp(&quot;^&quot;+(o?&quot;(&quot;+e.wheres[r]+&quot;)?&quot;:e.wheres[r])+&quot;$&quot;).test(null!=(u=t[r])?u:&quot;&quot;))throw new Error(&quot;Ziggy error: &#039;&quot;+r+&quot;&#039; parameter &#039;&quot;+t[r]+&quot;&#039; does not match required format &#039;&quot;+e.wheres[r]+&quot;&#039; for route &#039;&quot;+e.name+&quot;&#039;.&quot;);return encodeURI(null!=(i=t[r])?i:&quot;&quot;).replace(/%7C/g,&quot;|&quot;).replace(/%25/g,&quot;%&quot;).replace(/\$/g,&quot;%24&quot;)}).replace(this.config.absolute?/(\.[^/]+?)(\/\/)/:/(^)(\/\/)/,&quot;$1/&quot;).replace(/\/+$/,&quot;&quot;):this.template},e(t,[{key:&quot;template&quot;,get:function(){var t=(this.origin+&quot;/&quot;+this.definition.uri).replace(/\/+$/,&quot;&quot;);return&quot;&quot;===t?&quot;/&quot;:t}},{key:&quot;origin&quot;,get:function(){return this.config.absolute?this.definition.domain?&quot;&quot;+this.config.url.match(/^\w+:\/\//)[0]+this.definition.domain+(this.config.port?&quot;:&quot;+this.config.port:&quot;&quot;):this.config.url:&quot;&quot;}},{key:&quot;parameterSegments&quot;,get:function(){var t,e;return null!=(t=null==(e=this.template.match(/{[^}?]+\??}/g))?void 0:e.map(function(t){return{name:t.replace(/{|\??}/g,&quot;&quot;),required:!/\?}$/.test(t)}}))?t:[]}}])}(),B=/*#__PURE__*/function(t){function r(e,r,o,i){var u;if(void 0===o&amp;&amp;(o=!0),(u=t.call(this)||this).t=null!=i?i:&quot;undefined&quot;!=typeof Ziggy?Ziggy:null==globalThis?void 0:globalThis.Ziggy,!u.t&amp;&amp;&quot;undefined&quot;!=typeof document&amp;&amp;document.getElementById(&quot;ziggy-routes-json&quot;)&amp;&amp;(globalThis.Ziggy=JSON.parse(document.getElementById(&quot;ziggy-routes-json&quot;).textContent),u.t=globalThis.Ziggy),u.t=n({},u.t,{absolute:o}),e){if(!u.t.routes[e])throw new Error(&quot;Ziggy error: route &#039;&quot;+e+&quot;&#039; is not in the route list.&quot;);u.i=new Z(e,u.t.routes[e],u.t),u.u=u.l(r)}return u}var o,u;u=t,(o=r).prototype=Object.create(u.prototype),o.prototype.constructor=o,i(o,u);var f=r.prototype;return f.toString=function(){var t=this,e=Object.keys(this.u).filter(function(e){return!t.i.parameterSegments.some(function(t){return t.name===e})}).filter(function(t){return&quot;_query&quot;!==t}).reduce(function(e,r){var o;return n({},e,((o={})[r]=t.u[r],o))},{});return this.i.compile(this.u)+function(t,e){let n=t;const r=function(t){if(!t)return $;if(void 0!==t.allowEmptyArrays&amp;&amp;&quot;boolean&quot;!=typeof t.allowEmptyArrays)throw new TypeError(&quot;`allowEmptyArrays` option can only be `true` or `false`, when provided&quot;);if(void 0!==t.encodeDotInKeys&amp;&amp;&quot;boolean&quot;!=typeof t.encodeDotInKeys)throw new TypeError(&quot;`encodeDotInKeys` option can only be `true` or `false`, when provided&quot;);if(null!=t.encoder&amp;&amp;&quot;function&quot;!=typeof t.encoder)throw new TypeError(&quot;Encoder has to be a function.&quot;);const e=t.charset||$.charset;if(void 0!==t.charset&amp;&amp;&quot;utf-8&quot;!==t.charset&amp;&amp;&quot;iso-8859-1&quot;!==t.charset)throw new TypeError(&quot;The charset option must be either utf-8, iso-8859-1, or undefined&quot;);let n=s;if(void 0!==t.format){if(!R.call(a,t.format))throw new TypeError(&quot;Unknown format option provided.&quot;);n=t.format}const r=a[n];let o,i=$.filter;if((&quot;function&quot;==typeof t.filter||S(t.filter))&amp;&amp;(i=t.filter),o=t.arrayFormat in k?t.arrayFormat:&quot;indices&quot;in t?t.indices?&quot;indices&quot;:&quot;repeat&quot;:$.arrayFormat,&quot;commaRoundTrip&quot;in t&amp;&amp;&quot;boolean&quot;!=typeof t.commaRoundTrip)throw new TypeError(&quot;`commaRoundTrip` must be a boolean, or absent&quot;);return{addQueryPrefix:&quot;boolean&quot;==typeof t.addQueryPrefix?t.addQueryPrefix:$.addQueryPrefix,allowDots:void 0===t.allowDots?!0===t.encodeDotInKeys||$.allowDots:!!t.allowDots,allowEmptyArrays:&quot;boolean&quot;==typeof t.allowEmptyArrays?!!t.allowEmptyArrays:$.allowEmptyArrays,arrayFormat:o,charset:e,charsetSentinel:&quot;boolean&quot;==typeof t.charsetSentinel?t.charsetSentinel:$.charsetSentinel,commaRoundTrip:t.commaRoundTrip,delimiter:void 0===t.delimiter?$.delimiter:t.delimiter,encode:&quot;boolean&quot;==typeof t.encode?t.encode:$.encode,encodeDotInKeys:&quot;boolean&quot;==typeof t.encodeDotInKeys?t.encodeDotInKeys:$.encodeDotInKeys,encoder:&quot;function&quot;==typeof t.encoder?t.encoder:$.encoder,encodeValuesOnly:&quot;boolean&quot;==typeof t.encodeValuesOnly?t.encodeValuesOnly:$.encodeValuesOnly,filter:i,format:n,formatter:r,serializeDate:&quot;function&quot;==typeof t.serializeDate?t.serializeDate:$.serializeDate,skipNulls:&quot;boolean&quot;==typeof t.skipNulls?t.skipNulls:$.skipNulls,sort:&quot;function&quot;==typeof t.sort?t.sort:null,strictNullHandling:&quot;boolean&quot;==typeof t.strictNullHandling?t.strictNullHandling:$.strictNullHandling}}(e);let o,i;&quot;function&quot;==typeof r.filter?(i=r.filter,n=i(&quot;&quot;,n)):S(r.filter)&amp;&amp;(i=r.filter,o=i);const u=[];if(&quot;object&quot;!=typeof n||null===n)return&quot;&quot;;const f=k[r.arrayFormat],c=&quot;comma&quot;===f&amp;&amp;r.commaRoundTrip;o||(o=Object.keys(n)),r.sort&amp;&amp;o.sort(r.sort);const l=new WeakMap;for(let t=0;t&lt;o.length;++t){const e=o[t];r.skipNulls&amp;&amp;null===n[e]||A(u,_(n[e],e,f,c,r.allowEmptyArrays,r.strictNullHandling,r.skipNulls,r.encodeDotInKeys,r.encode?r.encoder:null,r.filter,r.sort,r.allowDots,r.serializeDate,r.format,r.formatter,r.encodeValuesOnly,r.charset,l))}const p=u.join(r.delimiter);let y=!0===r.addQueryPrefix?&quot;?&quot;:&quot;&quot;;return r.charsetSentinel&amp;&amp;(y+=&quot;iso-8859-1&quot;===r.charset?&quot;utf8=%26%2310003%3B&amp;&quot;:&quot;utf8=%E2%9C%93&amp;&quot;),p.length&gt;0?y+p:&quot;&quot;}(n({},e,this.u._query),{addQueryPrefix:!0,arrayFormat:&quot;indices&quot;,encodeValuesOnly:!0,skipNulls:!0,encoder:function(t,e){return&quot;boolean&quot;==typeof t?Number(t):e(t)}})},f.p=function(t){var e=this;t?this.t.absolute&amp;&amp;t.startsWith(&quot;/&quot;)&amp;&amp;(t=this.v().host+t):t=this.h();var r={},o=Object.entries(this.t.routes).find(function(n){return r=new Z(n[0],n[1],e.t).matchesUrl(t)})||[void 0,void 0];return n({name:o[0]},r,{route:o[1]})},f.h=function(){var t=this.v(),e=t.pathname,n=t.search;return(this.t.absolute?t.host+e:e.replace(this.t.url.replace(/^\w*:\/\/[^/]+/,&quot;&quot;),&quot;&quot;).replace(/^\/+/,&quot;/&quot;))+n},f.current=function(t,e){var r=this.p(),o=r.name,i=r.params,u=r.query,f=r.route;if(!t)return o;var c=new RegExp(&quot;^&quot;+t.replace(/\./g,&quot;\\.&quot;).replace(/\*/g,&quot;.*&quot;)+&quot;$&quot;).test(o);if([null,void 0].includes(e)||!c)return c;var l=new Z(o,f,this.t);e=this.l(e,l);var a=n({},i,u);if(Object.values(e).every(function(t){return!t})&amp;&amp;!Object.values(a).some(function(t){return void 0!==t}))return!0;var s=function(t,e){return Object.entries(t).every(function(t){var n=t[0],r=t[1];return Array.isArray(r)&amp;&amp;Array.isArray(e[n])?r.every(function(t){return e[n].includes(t)||e[n].includes(decodeURIComponent(t))}):&quot;object&quot;==typeof r&amp;&amp;&quot;object&quot;==typeof e[n]&amp;&amp;null!==r&amp;&amp;null!==e[n]?s(r,e[n]):e[n]==r||e[n]==decodeURIComponent(r)})};return s(e,a)},f.v=function(){var t,e,n,r,o,i,u=&quot;undefined&quot;!=typeof window?window.location:{},f=u.host,c=u.pathname,l=u.search;return{host:null!=(t=null==(e=this.t.location)?void 0:e.host)?t:void 0===f?&quot;&quot;:f,pathname:null!=(n=null==(r=this.t.location)?void 0:r.pathname)?n:void 0===c?&quot;&quot;:c,search:null!=(o=null==(i=this.t.location)?void 0:i.search)?o:void 0===l?&quot;&quot;:l}},f.has=function(t){return this.t.routes.hasOwnProperty(t)},f.l=function(t,e){var r=this;void 0===t&amp;&amp;(t={}),void 0===e&amp;&amp;(e=this.i),null!=t||(t={}),t=[&quot;string&quot;,&quot;number&quot;].includes(typeof t)?[t]:t;var o=e.parameterSegments.filter(function(t){return!r.t.defaults[t.name]});if(Array.isArray(t))t=t.reduce(function(t,e,r){var i,u;return n({},t,o[r]?((i={})[o[r].name]=e,i):&quot;object&quot;==typeof e?e:((u={})[e]=&quot;&quot;,u))},{});else if(1===o.length&amp;&amp;!t.hasOwnProperty(o[0].name)&amp;&amp;(t.hasOwnProperty(Object.values(e.bindings)[0])||t.hasOwnProperty(&quot;id&quot;))){var i;(i={})[o[0].name]=t,t=i}return n({},this.m(e),this.j(t,e))},f.m=function(t){var e=this;return t.parameterSegments.filter(function(t){return e.t.defaults[t.name]}).reduce(function(t,r,o){var i,u=r.name;return n({},t,((i={})[u]=e.t.defaults[u],i))},{})},f.j=function(t,e){var r=e.bindings,o=e.parameterSegments;return Object.entries(t).reduce(function(t,e){var i,u,f=e[0],c=e[1];if(!c||&quot;object&quot;!=typeof c||Array.isArray(c)||!o.some(function(t){return t.name===f}))return n({},t,((u={})[f]=c,u));var l=c.hasOwnProperty(r[f])?r[f]:c.hasOwnProperty(&quot;id&quot;)?&quot;id&quot;:void 0;if(void 0===l)throw new Error(&quot;Ziggy error: object passed as &#039;&quot;+f+&quot;&#039; parameter is missing route model binding key &#039;&quot;+r[f]+&quot;&#039;.&quot;);return n({},t,((i={})[f]=c[l],i))},{})},f.valueOf=function(){return this.toString()},e(r,[{key:&quot;params&quot;,get:function(){var t=this.p();return n({},t.params,t.query)}},{key:&quot;routeParams&quot;,get:function(){return this.p().params}},{key:&quot;queryParams&quot;,get:function(){return this.p().query}}])}(/*#__PURE__*/f(String));return function(t,e,n,r){var o=new B(t,e,n,r);return t?o.toString():o}});
&lt;/script&gt;                &lt;link rel=&quot;preload&quot; as=&quot;style&quot; href=&quot;http://localhost/build/assets/app-Dukl0do2.css&quot; /&gt;&lt;link rel=&quot;modulepreload&quot; as=&quot;script&quot; href=&quot;http://localhost/build/assets/app-BaqHKurI.js&quot; /&gt;&lt;link rel=&quot;stylesheet&quot; href=&quot;http://localhost/build/assets/app-Dukl0do2.css&quot; /&gt;&lt;script type=&quot;module&quot; src=&quot;http://localhost/build/assets/app-BaqHKurI.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
     window.addEventListener(&#039;load&#039;, () =&gt; window.setTimeout(() =&gt; {
        const makeLink = (asset) =&gt; {
            const link = document.createElement(&#039;link&#039;)

            Object.keys(asset).forEach((attribute) =&gt; {
                link.setAttribute(attribute, asset[attribute])
            })

            return link
        }

        const loadNext = (assets, count) =&gt; window.setTimeout(() =&gt; {
            if (count &gt; assets.length) {
                count = assets.length

                if (count === 0) {
                    return
                }
            }

            const fragment = new DocumentFragment

            while (count &gt; 0) {
                const link = makeLink(assets.shift())
                fragment.append(link)
                count--

                if (assets.length) {
                    link.onload = () =&gt; loadNext(assets, 1)
                    link.onerror = () =&gt; loadNext(assets, 1)
                }
            }

            document.head.append(fragment)
        })

        loadNext(JSON.parse(&#039;[{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/ConfirmPassword-DPv-hhms.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/ForgotPassword-BC6Y4z63.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/Login-Bn22npEE.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/Register-CrKCUkWV.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/ResetPassword-eVw-SW9q.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/VerifyEmail-BLoSLJSw.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/Dashboard-C_2yt3c8.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/AuthenticatedLayout-CboUUh66.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/ApplicationLogo-DSUS-g3c.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/transition-BzU1cnQZ.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/Edit-BwfxVZ5F.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/DeleteUserForm-Bc3RPT1I.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/UpdatePasswordForm-D7PfkTqz.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/UpdateProfileInformationForm-CjIDtz3j.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/Welcome-CpXTyGwC.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/TextInput-BgoquPUt.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/InputLabel-Do0cT8GP.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/PrimaryButton-Bt-YWkQT.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/GuestLayout-aI9uCCHb.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022}]&#039;), 3)
    }))
&lt;/script&gt;            &lt;/head&gt;
    &lt;body class=&quot;font-sans antialiased&quot;&gt;
        &lt;div id=&quot;app&quot; data-page=&quot;{&amp;quot;component&amp;quot;:&amp;quot;Job\/Index&amp;quot;,&amp;quot;props&amp;quot;:{&amp;quot;errors&amp;quot;:{},&amp;quot;auth&amp;quot;:{&amp;quot;user&amp;quot;:null},&amp;quot;allJ&amp;quot;:[],&amp;quot;allC&amp;quot;:[],&amp;quot;allS&amp;quot;:[]},&amp;quot;url&amp;quot;:&amp;quot;\/jobs&amp;quot;,&amp;quot;version&amp;quot;:&amp;quot;d69f32664db00068d06607eca78239c4&amp;quot;,&amp;quot;clearHistory&amp;quot;:false,&amp;quot;encryptHistory&amp;quot;:false}&quot;&gt;&lt;/div&gt;    &lt;/body&gt;
&lt;/html&gt;
</code>
 </pre>
    </span>
<span id="execution-results-GETjobs" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETjobs"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETjobs"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETjobs" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETjobs">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETjobs" data-method="GET"
      data-path="jobs"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETjobs', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETjobs"
                    onclick="tryItOut('GETjobs');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETjobs"
                    onclick="cancelTryOut('GETjobs');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETjobs"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>jobs</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETjobs"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETjobs"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETjobs--id-">Display the specified resource.</h2>

<p>
</p>



<span id="example-requests-GETjobs--id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://localhost/jobs/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://localhost/jobs/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETjobs--id-">
            <blockquote>
            <p>Example response (500):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;utf-8&quot;&gt;
        &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;

        &lt;title&gt;Server Error&lt;/title&gt;

        &lt;style&gt;
            /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}a{background-color:transparent}code{font-family:monospace,monospace;font-size:1em}[hidden]{display:none}html{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}*,:after,:before{box-sizing:border-box;border:0 solid #e2e8f0}a{color:inherit;text-decoration:inherit}code{font-family:Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}svg,video{display:block;vertical-align:middle}video{max-width:100%;height:auto}.bg-white{--bg-opacity:1;background-color:#fff;background-color:rgba(255,255,255,var(--bg-opacity))}.bg-gray-100{--bg-opacity:1;background-color:#f7fafc;background-color:rgba(247,250,252,var(--bg-opacity))}.border-gray-200{--border-opacity:1;border-color:#edf2f7;border-color:rgba(237,242,247,var(--border-opacity))}.border-gray-400{--border-opacity:1;border-color:#cbd5e0;border-color:rgba(203,213,224,var(--border-opacity))}.border-t{border-top-width:1px}.border-r{border-right-width:1px}.flex{display:flex}.grid{display:grid}.hidden{display:none}.items-center{align-items:center}.justify-center{justify-content:center}.font-semibold{font-weight:600}.h-5{height:1.25rem}.h-8{height:2rem}.h-16{height:4rem}.text-sm{font-size:.875rem}.text-lg{font-size:1.125rem}.leading-7{line-height:1.75rem}.mx-auto{margin-left:auto;margin-right:auto}.ml-1{margin-left:.25rem}.mt-2{margin-top:.5rem}.mr-2{margin-right:.5rem}.ml-2{margin-left:.5rem}.mt-4{margin-top:1rem}.ml-4{margin-left:1rem}.mt-8{margin-top:2rem}.ml-12{margin-left:3rem}.-mt-px{margin-top:-1px}.max-w-xl{max-width:36rem}.max-w-6xl{max-width:72rem}.min-h-screen{min-height:100vh}.overflow-hidden{overflow:hidden}.p-6{padding:1.5rem}.py-4{padding-top:1rem;padding-bottom:1rem}.px-4{padding-left:1rem;padding-right:1rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.pt-8{padding-top:2rem}.fixed{position:fixed}.relative{position:relative}.top-0{top:0}.right-0{right:0}.shadow{box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)}.text-center{text-align:center}.text-gray-200{--text-opacity:1;color:#edf2f7;color:rgba(237,242,247,var(--text-opacity))}.text-gray-300{--text-opacity:1;color:#e2e8f0;color:rgba(226,232,240,var(--text-opacity))}.text-gray-400{--text-opacity:1;color:#cbd5e0;color:rgba(203,213,224,var(--text-opacity))}.text-gray-500{--text-opacity:1;color:#a0aec0;color:rgba(160,174,192,var(--text-opacity))}.text-gray-600{--text-opacity:1;color:#718096;color:rgba(113,128,150,var(--text-opacity))}.text-gray-700{--text-opacity:1;color:#4a5568;color:rgba(74,85,104,var(--text-opacity))}.text-gray-900{--text-opacity:1;color:#1a202c;color:rgba(26,32,44,var(--text-opacity))}.uppercase{text-transform:uppercase}.underline{text-decoration:underline}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.tracking-wider{letter-spacing:.05em}.w-5{width:1.25rem}.w-8{width:2rem}.w-auto{width:auto}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}@-webkit-keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes spin{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@-webkit-keyframes ping{0%{transform:scale(1);opacity:1}75%,to{transform:scale(2);opacity:0}}@keyframes ping{0%{transform:scale(1);opacity:1}75%,to{transform:scale(2);opacity:0}}@-webkit-keyframes pulse{0%,to{opacity:1}50%{opacity:.5}}@keyframes pulse{0%,to{opacity:1}50%{opacity:.5}}@-webkit-keyframes bounce{0%,to{transform:translateY(-25%);-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:translateY(0);-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1)}}@keyframes bounce{0%,to{transform:translateY(-25%);-webkit-animation-timing-function:cubic-bezier(.8,0,1,1);animation-timing-function:cubic-bezier(.8,0,1,1)}50%{transform:translateY(0);-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1)}}@media (min-width:640px){.sm\:rounded-lg{border-radius:.5rem}.sm\:block{display:block}.sm\:items-center{align-items:center}.sm\:justify-start{justify-content:flex-start}.sm\:justify-between{justify-content:space-between}.sm\:h-20{height:5rem}.sm\:ml-0{margin-left:0}.sm\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\:pt-0{padding-top:0}.sm\:text-left{text-align:left}.sm\:text-right{text-align:right}}@media (min-width:768px){.md\:border-t-0{border-top-width:0}.md\:border-l{border-left-width:1px}.md\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (min-width:1024px){.lg\:px-8{padding-left:2rem;padding-right:2rem}}@media (prefers-color-scheme:dark){.dark\:bg-gray-800{--bg-opacity:1;background-color:#2d3748;background-color:rgba(45,55,72,var(--bg-opacity))}.dark\:bg-gray-900{--bg-opacity:1;background-color:#1a202c;background-color:rgba(26,32,44,var(--bg-opacity))}.dark\:border-gray-700{--border-opacity:1;border-color:#4a5568;border-color:rgba(74,85,104,var(--border-opacity))}.dark\:text-white{--text-opacity:1;color:#fff;color:rgba(255,255,255,var(--text-opacity))}.dark\:text-gray-300 { --text-opacity: 1; color: #e2e8f0; color: rgba(226,232,240,var(--text-opacity)) }}
        &lt;/style&gt;

        &lt;style&gt;
            body {
                font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;;
            }
        &lt;/style&gt;
    &lt;/head&gt;
    &lt;body class=&quot;antialiased bg-white text-black&quot;&gt;
        &lt;div class=&quot;relative flex items-top justify-center min-h-screen bg-white text-black sm:items-center sm:pt-0&quot; role=&quot;main&quot;&gt;
            &lt;div class=&quot;max-w-xl mx-auto sm:px-6 lg:px-8&quot;&gt;
                &lt;div class=&quot;flex items-center pt-8 sm:justify-start sm:pt-0&quot;&gt;
                    &lt;h1 class=&quot;px-4 text-lg text-black border-r border-gray-400&quot;&gt;
                        500                    &lt;/h1&gt;

                    &lt;div class=&quot;ml-4 text-lg text-black&quot;&gt;
                        Server Error                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/body&gt;
&lt;/html&gt;
</code>
 </pre>
    </span>
<span id="execution-results-GETjobs--id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETjobs--id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETjobs--id-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETjobs--id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETjobs--id-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETjobs--id-" data-method="GET"
      data-path="jobs/{id}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETjobs--id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETjobs--id-"
                    onclick="tryItOut('GETjobs--id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETjobs--id-"
                    onclick="cancelTryOut('GETjobs--id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETjobs--id-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>jobs/{id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETjobs--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETjobs--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="id"                data-endpoint="GETjobs--id-"
               value="architecto"
               data-component="url">
    <br>
<p>The ID of the job. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETprofile">Display the user&#039;s profile form.</h2>

<p>
</p>



<span id="example-requests-GETprofile">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://localhost/profile" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://localhost/profile"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETprofile">
            <blockquote>
            <p>Example response (302):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
location: http://localhost/login
content-type: text/html; charset=utf-8
set-cookie: XSRF-TOKEN=eyJpdiI6IlYvTDZnUk1GZmdGcWQxalZRYWlsb1E9PSIsInZhbHVlIjoib1hCenlFNUNDa0NGNE9HUjR3WEhWTlhhbEx4ekNuSmpORXR4SkZXUUgrbU1qaEVqQ0tPTEgwYkM5bmI2NlJXcXlYVkdOdFVyeFIvUmZXWk1Kem5XSXBxaUFUMGFiaTJpK1lmZkVBNy8rbStJMThBN2pWODdhVGFleHJNMndXclUiLCJtYWMiOiIyM2EzODhmYjU2ZmIwMzMyN2U0YzllOGMwYTczNDc5M2I4ZTAyMDUyYWM3M2NjYjllZjY1NGM4ZjRmN2Q0OTU3IiwidGFnIjoiIn0%3D; expires=Wed, 22 Jul 2026 15:04:36 GMT; Max-Age=7200; path=/; samesite=lax; laravel-session=eyJpdiI6IlY4L2ZvVEl4azR2TFV0U0JYNEVrWnc9PSIsInZhbHVlIjoiSkNhWFgxaHNrWUYzUnJGRDFqWEhJYmZCTmlBOTRLYlU3VERlVHNaQWtPWDVtZ3dYTGltb0Eyb0cydWZiaGJUeGx6Y3pQemJWVlBNVmRJNDIyQ0dmMVJyaFlQa2MxY2p3bURQZFgySUh3cEpCcmZSMUxncnc0bG92UGhIdlNLbkUiLCJtYWMiOiJjY2IzMWY0ZDkxMmUzOWFhNmZhNTgzMDNjMzRhZjlhYWQ4MDIyNWQyZDYyZGJlNDk1ZDgwNzkyMTg5NjkzYThjIiwidGFnIjoiIn0%3D; expires=Wed, 22 Jul 2026 15:04:36 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;UTF-8&quot; /&gt;
        &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0;url=&#039;http://localhost/login&#039;&quot; /&gt;

        &lt;title&gt;Redirecting to http://localhost/login&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        Redirecting to &lt;a href=&quot;http://localhost/login&quot;&gt;http://localhost/login&lt;/a&gt;.
    &lt;/body&gt;
&lt;/html&gt;</code>
 </pre>
    </span>
<span id="execution-results-GETprofile" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETprofile"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETprofile"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETprofile" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETprofile">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETprofile" data-method="GET"
      data-path="profile"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETprofile', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETprofile"
                    onclick="tryItOut('GETprofile');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETprofile"
                    onclick="cancelTryOut('GETprofile');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETprofile"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>profile</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETprofile"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETprofile"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-DELETEprofile">Delete the user&#039;s account.</h2>

<p>
</p>



<span id="example-requests-DELETEprofile">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://localhost/profile" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"password\": \"architecto\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://localhost/profile"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "password": "architecto"
};

fetch(url, {
    method: "DELETE",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEprofile">
</span>
<span id="execution-results-DELETEprofile" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEprofile"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEprofile"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEprofile" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEprofile">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-DELETEprofile" data-method="DELETE"
      data-path="profile"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEprofile', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEprofile"
                    onclick="tryItOut('DELETEprofile');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEprofile"
                    onclick="cancelTryOut('DELETEprofile');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEprofile"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>profile</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEprofile"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEprofile"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="password"                data-endpoint="DELETEprofile"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETadmin-users">GET admin/users</h2>

<p>
</p>



<span id="example-requests-GETadmin-users">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://localhost/admin/users" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://localhost/admin/users"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETadmin-users">
            <blockquote>
            <p>Example response (302):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
location: http://localhost/login
content-type: text/html; charset=utf-8
set-cookie: XSRF-TOKEN=eyJpdiI6Ii9KWURoSU8wNytFZnlwbW4vR3NlV1E9PSIsInZhbHVlIjoiYWhoL0JvdE1XMzdSSEZEVzVBNEg0VEVwbGtOTkV5QUgzLzI0ektQNFBtajIycm01aCtkUyszVDdtaXMyeS9aSTBRZG1ISU1aYnVSU3d5ODltdGlxY3laUm5GOVVwSmV1MVpPL01HWHFLcndNS0htc1RIMU9vWFRpY1ZxeGphZ3QiLCJtYWMiOiI0ZDA0Njg4NjVjZDA5MzQ0NzgzZGQ2Yjg4NDYxYjE0YjJkNDkwYmY5ZjYzZTczYjI4NzdmYWZhMmNkOGNhOTM1IiwidGFnIjoiIn0%3D; expires=Wed, 22 Jul 2026 15:04:36 GMT; Max-Age=7200; path=/; samesite=lax; laravel-session=eyJpdiI6IktwS25GNElkMEZBdHpMOUJyVitBT1E9PSIsInZhbHVlIjoiMHlaWDdkZ3ZZZFRDcVJuR0MwaVFWK0xmN2ZkTUNUZUJFcG9rU244V1FPS0Q0Nk9RMHJkQVRiTGhGNkJjQTYwNERIcFFvU0loTVVxS3g0ampFb1Q4RlcwRnpRTVZheDIya1UyZnZqM0JvM1oxcG12WmpwMmUxQXRyUGpkbmZSVUwiLCJtYWMiOiJlNDU3NzcyNDZiY2RjNjk4Mzg1Y2MyZTIyM2ZkMTUyMDA2ZTdhN2JiODFmODE0NjU4M2E2MDdhNThjYWY3M2Y2IiwidGFnIjoiIn0%3D; expires=Wed, 22 Jul 2026 15:04:36 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;UTF-8&quot; /&gt;
        &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0;url=&#039;http://localhost/login&#039;&quot; /&gt;

        &lt;title&gt;Redirecting to http://localhost/login&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        Redirecting to &lt;a href=&quot;http://localhost/login&quot;&gt;http://localhost/login&lt;/a&gt;.
    &lt;/body&gt;
&lt;/html&gt;</code>
 </pre>
    </span>
<span id="execution-results-GETadmin-users" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETadmin-users"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETadmin-users"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETadmin-users" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETadmin-users">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETadmin-users" data-method="GET"
      data-path="admin/users"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETadmin-users', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETadmin-users"
                    onclick="tryItOut('GETadmin-users');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETadmin-users"
                    onclick="cancelTryOut('GETadmin-users');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETadmin-users"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>admin/users</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETadmin-users"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETadmin-users"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-GETadmin-users-create">GET admin/users/create</h2>

<p>
</p>



<span id="example-requests-GETadmin-users-create">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://localhost/admin/users/create" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://localhost/admin/users/create"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETadmin-users-create">
            <blockquote>
            <p>Example response (302):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
location: http://localhost/login
content-type: text/html; charset=utf-8
set-cookie: XSRF-TOKEN=eyJpdiI6IjdscklMWUFsQ3FBaE1wU29yYnJzUkE9PSIsInZhbHVlIjoiaEZ0TW9QY2oyY0M5ZWdMNEsvRUljQ3IvbjVwcTg3RENhQVRCU1I4WjBSQ1JHU0lYeE94ZWNIdEVBTU9lVVRMNjNUc2Y3ejM3NDREUVhhaUV4TS9IYWEvRmZQMjZZRDJEMytGV1NPVm5hVmpQZThaenJZdnh4Ykp0UUQxczhGR3QiLCJtYWMiOiIzNGY0NWY0NWZhZjgyODNkMmNhYTM4ZjAxNzkyNWY1MGQ0YjY5Zjc5OTQ1YTEzODRiZDNmMGRmM2YyNGVkZDBhIiwidGFnIjoiIn0%3D; expires=Wed, 22 Jul 2026 15:04:36 GMT; Max-Age=7200; path=/; samesite=lax; laravel-session=eyJpdiI6Imp6ZTJ1c2thT3l3R080SUpSZ25PQmc9PSIsInZhbHVlIjoieVRFVThEelZ4SWJPRU9rRzhkZjNYWlJGQmRYdk00R1RkVjFJUkFaR3lLVUpQeWtNbFlPNCtraHBFMHhOdWNkY3o5ZFdhUGlGV3pzcVh4ZnUrcEVaTmZwRU9xdmxyS3pUQ0lNaWxKNk41ckVURm9OVWNFaUx0Uk01NExENkt4UzAiLCJtYWMiOiI3M2YwZTA2Mzk2MWY4MWRiMGJmMGZlNDRmMjA1ZGFiMWVkM2RmY2Q2Y2NlOWJlMDU5ZWUwODNlNmY0ZDMzOGE0IiwidGFnIjoiIn0%3D; expires=Wed, 22 Jul 2026 15:04:36 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">&lt;!DOCTYPE html&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;UTF-8&quot; /&gt;
        &lt;meta http-equiv=&quot;refresh&quot; content=&quot;0;url=&#039;http://localhost/login&#039;&quot; /&gt;

        &lt;title&gt;Redirecting to http://localhost/login&lt;/title&gt;
    &lt;/head&gt;
    &lt;body&gt;
        Redirecting to &lt;a href=&quot;http://localhost/login&quot;&gt;http://localhost/login&lt;/a&gt;.
    &lt;/body&gt;
&lt;/html&gt;</code>
 </pre>
    </span>
<span id="execution-results-GETadmin-users-create" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETadmin-users-create"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETadmin-users-create"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETadmin-users-create" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETadmin-users-create">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETadmin-users-create" data-method="GET"
      data-path="admin/users/create"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETadmin-users-create', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETadmin-users-create"
                    onclick="tryItOut('GETadmin-users-create');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETadmin-users-create"
                    onclick="cancelTryOut('GETadmin-users-create');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETadmin-users-create"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>admin/users/create</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETadmin-users-create"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETadmin-users-create"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTadmin-users">POST admin/users</h2>

<p>
</p>



<span id="example-requests-POSTadmin-users">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://localhost/admin/users" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"name\": \"b\",
    \"email\": \"zbailey@example.net\",
    \"password\": \"-0pBNvYgxw\",
    \"role\": \"admin\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://localhost/admin/users"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "name": "b",
    "email": "zbailey@example.net",
    "password": "-0pBNvYgxw",
    "role": "admin"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTadmin-users">
</span>
<span id="execution-results-POSTadmin-users" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTadmin-users"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTadmin-users"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTadmin-users" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTadmin-users">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTadmin-users" data-method="POST"
      data-path="admin/users"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTadmin-users', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTadmin-users"
                    onclick="tryItOut('POSTadmin-users');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTadmin-users"
                    onclick="cancelTryOut('POSTadmin-users');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTadmin-users"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>admin/users</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTadmin-users"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTadmin-users"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="POSTadmin-users"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>email</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="email"                data-endpoint="POSTadmin-users"
               value="zbailey@example.net"
               data-component="body">
    <br>
<p>Must be a valid email address. Must not be greater than 255 characters. Example: <code>zbailey@example.net</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="password"                data-endpoint="POSTadmin-users"
               value="-0pBNvYgxw"
               data-component="body">
    <br>
<p>Must be at least 8 characters. Example: <code>-0pBNvYgxw</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>role</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="role"                data-endpoint="POSTadmin-users"
               value="admin"
               data-component="body">
    <br>
<p>Example: <code>admin</code></p>
Must be one of:
<ul style="list-style-type: square;"><li><code>admin</code></li> <li><code>user</code></li></ul>
        </div>
        </form>

                    <h2 id="endpoints-PUTadmin-users--id-">PUT admin/users/{id}</h2>

<p>
</p>



<span id="example-requests-PUTadmin-users--id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PUT \
    "http://localhost/admin/users/16" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"name\": \"b\",
    \"role\": \"user\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://localhost/admin/users/16"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "name": "b",
    "role": "user"
};

fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PUTadmin-users--id-">
</span>
<span id="execution-results-PUTadmin-users--id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PUTadmin-users--id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PUTadmin-users--id-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PUTadmin-users--id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PUTadmin-users--id-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PUTadmin-users--id-" data-method="PUT"
      data-path="admin/users/{id}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PUTadmin-users--id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PUTadmin-users--id-"
                    onclick="tryItOut('PUTadmin-users--id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PUTadmin-users--id-"
                    onclick="cancelTryOut('PUTadmin-users--id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PUTadmin-users--id-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-darkblue">PUT</small>
            <b><code>admin/users/{id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PUTadmin-users--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PUTadmin-users--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="id"                data-endpoint="PUTadmin-users--id-"
               value="16"
               data-component="url">
    <br>
<p>The ID of the user. Example: <code>16</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="PUTadmin-users--id-"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>email</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="email"                data-endpoint="PUTadmin-users--id-"
               value=""
               data-component="body">
    <br>

        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>role</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="role"                data-endpoint="PUTadmin-users--id-"
               value="user"
               data-component="body">
    <br>
<p>Example: <code>user</code></p>
Must be one of:
<ul style="list-style-type: square;"><li><code>admin</code></li> <li><code>user</code></li></ul>
        </div>
        </form>

                    <h2 id="endpoints-DELETEadmin-users--id-">DELETE admin/users/{id}</h2>

<p>
</p>



<span id="example-requests-DELETEadmin-users--id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://localhost/admin/users/16" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://localhost/admin/users/16"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEadmin-users--id-">
</span>
<span id="execution-results-DELETEadmin-users--id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEadmin-users--id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEadmin-users--id-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEadmin-users--id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEadmin-users--id-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-DELETEadmin-users--id-" data-method="DELETE"
      data-path="admin/users/{id}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEadmin-users--id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEadmin-users--id-"
                    onclick="tryItOut('DELETEadmin-users--id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEadmin-users--id-"
                    onclick="cancelTryOut('DELETEadmin-users--id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEadmin-users--id-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>admin/users/{id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEadmin-users--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEadmin-users--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="id"                data-endpoint="DELETEadmin-users--id-"
               value="16"
               data-component="url">
    <br>
<p>The ID of the user. Example: <code>16</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-PATCHadmin-users--id--changeRole">PATCH admin/users/{id}/changeRole</h2>

<p>
</p>



<span id="example-requests-PATCHadmin-users--id--changeRole">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request PATCH \
    "http://localhost/admin/users/16/changeRole" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"role\": \"admin\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://localhost/admin/users/16/changeRole"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "role": "admin"
};

fetch(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-PATCHadmin-users--id--changeRole">
</span>
<span id="execution-results-PATCHadmin-users--id--changeRole" hidden>
    <blockquote>Received response<span
                id="execution-response-status-PATCHadmin-users--id--changeRole"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-PATCHadmin-users--id--changeRole"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-PATCHadmin-users--id--changeRole" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-PATCHadmin-users--id--changeRole">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-PATCHadmin-users--id--changeRole" data-method="PATCH"
      data-path="admin/users/{id}/changeRole"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('PATCHadmin-users--id--changeRole', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-PATCHadmin-users--id--changeRole"
                    onclick="tryItOut('PATCHadmin-users--id--changeRole');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-PATCHadmin-users--id--changeRole"
                    onclick="cancelTryOut('PATCHadmin-users--id--changeRole');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-PATCHadmin-users--id--changeRole"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-purple">PATCH</small>
            <b><code>admin/users/{id}/changeRole</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="PATCHadmin-users--id--changeRole"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="PATCHadmin-users--id--changeRole"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>integer</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="number" style="display: none"
               step="any"               name="id"                data-endpoint="PATCHadmin-users--id--changeRole"
               value="16"
               data-component="url">
    <br>
<p>The ID of the user. Example: <code>16</code></p>
            </div>
                            <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>role</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="role"                data-endpoint="PATCHadmin-users--id--changeRole"
               value="admin"
               data-component="body">
    <br>
<p>Example: <code>admin</code></p>
Must be one of:
<ul style="list-style-type: square;"><li><code>admin</code></li> <li><code>user</code></li></ul>
        </div>
        </form>

                    <h2 id="endpoints-DELETEadmin-jobs--id-">Remove the specified resource from storage.</h2>

<p>
</p>



<span id="example-requests-DELETEadmin-jobs--id-">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request DELETE \
    "http://localhost/admin/jobs/architecto" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://localhost/admin/jobs/architecto"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "DELETE",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-DELETEadmin-jobs--id-">
</span>
<span id="execution-results-DELETEadmin-jobs--id-" hidden>
    <blockquote>Received response<span
                id="execution-response-status-DELETEadmin-jobs--id-"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-DELETEadmin-jobs--id-"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-DELETEadmin-jobs--id-" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-DELETEadmin-jobs--id-">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-DELETEadmin-jobs--id-" data-method="DELETE"
      data-path="admin/jobs/{id}"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('DELETEadmin-jobs--id-', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-DELETEadmin-jobs--id-"
                    onclick="tryItOut('DELETEadmin-jobs--id-');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-DELETEadmin-jobs--id-"
                    onclick="cancelTryOut('DELETEadmin-jobs--id-');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-DELETEadmin-jobs--id-"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-red">DELETE</small>
            <b><code>admin/jobs/{id}</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="DELETEadmin-jobs--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="DELETEadmin-jobs--id-"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        <h4 class="fancy-heading-panel"><b>URL Parameters</b></h4>
                    <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>id</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="id"                data-endpoint="DELETEadmin-jobs--id-"
               value="architecto"
               data-component="url">
    <br>
<p>The ID of the job. Example: <code>architecto</code></p>
            </div>
                    </form>

                    <h2 id="endpoints-GETregister">Display the registration view.</h2>

<p>
</p>



<span id="example-requests-GETregister">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://localhost/register" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://localhost/register"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETregister">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
link: &lt;http://localhost/build/assets/app-Dukl0do2.css&gt;; rel=&quot;preload&quot;; as=&quot;style&quot;, &lt;http://localhost/build/assets/app-BaqHKurI.js&gt;; rel=&quot;modulepreload&quot;; as=&quot;script&quot;
vary: X-Inertia
set-cookie: XSRF-TOKEN=eyJpdiI6InVHSmFXRWxvRUFneCs3MHdsbWNoS0E9PSIsInZhbHVlIjoibG9WVS9LdnIwRTF4VjRGUkpkY3c1ZEhQVFUvb2FvbGtjUlg1U0Q2cjJSQ2JuVVZVVUNiVHhxQ3UzY3c4R25VM2t5TjRhbkorejJ5aFprbm5Jc3ZWdC9Ic29CYmZkNnNUVGVMU2R1d2RheXhrbElHZTJJWERoUVVWWWV0NGUzSVIiLCJtYWMiOiI1MDBmNThiZjg1YzMyNGQxNDlhMWJmMDgyMmNkNzE3ZmU3NzdlYWYxMDBmZjJmYTFhNDAyMWMzYmYyY2QzNGE4IiwidGFnIjoiIn0%3D; expires=Wed, 22 Jul 2026 15:04:36 GMT; Max-Age=7200; path=/; samesite=lax; laravel-session=eyJpdiI6InhSTG8yUGwwRGRXWXdxdjVUUHBieXc9PSIsInZhbHVlIjoicXFqMW4rdC8rUENoaGU3SnV3cnlxc3hMQng1QU5Oa2dtRFMvZTFGOGNMZDBZUHJCTGtDeUlOaGhYUjJiTkQ2ZjEwOXZ6d1pDdE9OaThxa1Q4aXd3WVJVRW5ManFsWDhvaFNJWDl4d3kxMmNVS2NGU21yOFF6TUtCUCs0MjlrUisiLCJtYWMiOiJhMmY2MWUyOWI2N2Q1NTcxMDk4MWUxOTk5YmNmOTYwODk5YmY0ZDExNWFhMTdkYzgyNTJlMGRkNDViZDk5MjQxIiwidGFnIjoiIn0%3D; expires=Wed, 22 Jul 2026 15:04:36 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;utf-8&quot;&gt;
        &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;

        &lt;title inertia&gt;Laravel&lt;/title&gt;

        &lt;!-- Fonts --&gt;
        &lt;link rel=&quot;preconnect&quot; href=&quot;https://fonts.googleapis.com&quot;&gt;
        &lt;link rel=&quot;preconnect&quot; href=&quot;https://fonts.gstatic.com&quot; crossorigin&gt;
        &lt;link href=&quot;https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&amp;family=Inter:wght@400;500;600&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap&quot; rel=&quot;stylesheet&quot;&gt;
        &lt;link href=&quot;https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap&quot; rel=&quot;stylesheet&quot;&gt;

        &lt;!-- Scripts --&gt;
        &lt;script type=&quot;text/javascript&quot;&gt;Object.assign(Ziggy.routes,{&quot;debugbar.openhandler&quot;:{&quot;uri&quot;:&quot;_debugbar\/open&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;debugbar.cache.delete&quot;:{&quot;uri&quot;:&quot;_debugbar\/cache\/{key}&quot;,&quot;methods&quot;:[&quot;DELETE&quot;],&quot;wheres&quot;:{&quot;key&quot;:&quot;.*&quot;},&quot;parameters&quot;:[&quot;key&quot;]},&quot;debugbar.queries.explain&quot;:{&quot;uri&quot;:&quot;_debugbar\/queries\/explain&quot;,&quot;methods&quot;:[&quot;POST&quot;]},&quot;debugbar.clockwork&quot;:{&quot;uri&quot;:&quot;_debugbar\/clockwork\/{id}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;parameters&quot;:[&quot;id&quot;]},&quot;debugbar.assets&quot;:{&quot;uri&quot;:&quot;_debugbar\/assets&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;debugbar.telescope&quot;:{&quot;uri&quot;:&quot;_debugbar\/telescope\/{id}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;parameters&quot;:[&quot;id&quot;]},&quot;scribe&quot;:{&quot;uri&quot;:&quot;docs&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;scribe.postman&quot;:{&quot;uri&quot;:&quot;docs.postman&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;scribe.openapi&quot;:{&quot;uri&quot;:&quot;docs.openapi&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;sanctum.csrf-cookie&quot;:{&quot;uri&quot;:&quot;sanctum\/csrf-cookie&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;telescope&quot;:{&quot;uri&quot;:&quot;telescope\/{view?}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;wheres&quot;:{&quot;view&quot;:&quot;(.*)&quot;},&quot;parameters&quot;:[&quot;view&quot;]},&quot;jobs.show&quot;:{&quot;uri&quot;:&quot;jobs\/{job}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;parameters&quot;:[&quot;job&quot;],&quot;bindings&quot;:{&quot;job&quot;:&quot;id&quot;}},&quot;dashboard&quot;:{&quot;uri&quot;:&quot;dashboard&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;jobs.index&quot;:{&quot;uri&quot;:&quot;jobs&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;profile.edit&quot;:{&quot;uri&quot;:&quot;profile&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;profile.update&quot;:{&quot;uri&quot;:&quot;profile&quot;,&quot;methods&quot;:[&quot;PATCH&quot;]},&quot;profile.destroy&quot;:{&quot;uri&quot;:&quot;profile&quot;,&quot;methods&quot;:[&quot;DELETE&quot;]},&quot;admin.users.index&quot;:{&quot;uri&quot;:&quot;admin\/users&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;admin.users.create&quot;:{&quot;uri&quot;:&quot;admin\/users\/create&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;admin.users.store&quot;:{&quot;uri&quot;:&quot;admin\/users&quot;,&quot;methods&quot;:[&quot;POST&quot;]},&quot;admin.users.update&quot;:{&quot;uri&quot;:&quot;admin\/users\/{id}&quot;,&quot;methods&quot;:[&quot;PUT&quot;],&quot;parameters&quot;:[&quot;id&quot;]},&quot;admin.users.destroy&quot;:{&quot;uri&quot;:&quot;admin\/users\/{id}&quot;,&quot;methods&quot;:[&quot;DELETE&quot;],&quot;parameters&quot;:[&quot;id&quot;]},&quot;admin.users.changeRole&quot;:{&quot;uri&quot;:&quot;admin\/users\/{id}\/changeRole&quot;,&quot;methods&quot;:[&quot;PATCH&quot;],&quot;parameters&quot;:[&quot;id&quot;]},&quot;admin.jobs.destroy&quot;:{&quot;uri&quot;:&quot;admin\/jobs\/{id}&quot;,&quot;methods&quot;:[&quot;DELETE&quot;],&quot;parameters&quot;:[&quot;id&quot;]},&quot;register&quot;:{&quot;uri&quot;:&quot;register&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;login&quot;:{&quot;uri&quot;:&quot;login&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;password.request&quot;:{&quot;uri&quot;:&quot;forgot-password&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;password.email&quot;:{&quot;uri&quot;:&quot;forgot-password&quot;,&quot;methods&quot;:[&quot;POST&quot;]},&quot;password.reset&quot;:{&quot;uri&quot;:&quot;reset-password\/{token}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;parameters&quot;:[&quot;token&quot;]},&quot;password.store&quot;:{&quot;uri&quot;:&quot;reset-password&quot;,&quot;methods&quot;:[&quot;POST&quot;]},&quot;verification.notice&quot;:{&quot;uri&quot;:&quot;verify-email&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;verification.verify&quot;:{&quot;uri&quot;:&quot;verify-email\/{id}\/{hash}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;parameters&quot;:[&quot;id&quot;,&quot;hash&quot;]},&quot;verification.send&quot;:{&quot;uri&quot;:&quot;email\/verification-notification&quot;,&quot;methods&quot;:[&quot;POST&quot;]},&quot;password.confirm&quot;:{&quot;uri&quot;:&quot;confirm-password&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;password.update&quot;:{&quot;uri&quot;:&quot;password&quot;,&quot;methods&quot;:[&quot;PUT&quot;]},&quot;logout&quot;:{&quot;uri&quot;:&quot;logout&quot;,&quot;methods&quot;:[&quot;POST&quot;]},&quot;storage.local&quot;:{&quot;uri&quot;:&quot;storage\/{path}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;wheres&quot;:{&quot;path&quot;:&quot;.*&quot;},&quot;parameters&quot;:[&quot;path&quot;]},&quot;storage.local.upload&quot;:{&quot;uri&quot;:&quot;storage\/{path}&quot;,&quot;methods&quot;:[&quot;PUT&quot;],&quot;wheres&quot;:{&quot;path&quot;:&quot;.*&quot;},&quot;parameters&quot;:[&quot;path&quot;]}});&lt;/script&gt;                &lt;link rel=&quot;preload&quot; as=&quot;style&quot; href=&quot;http://localhost/build/assets/app-Dukl0do2.css&quot; /&gt;&lt;link rel=&quot;modulepreload&quot; as=&quot;script&quot; href=&quot;http://localhost/build/assets/app-BaqHKurI.js&quot; /&gt;&lt;link rel=&quot;stylesheet&quot; href=&quot;http://localhost/build/assets/app-Dukl0do2.css&quot; /&gt;&lt;script type=&quot;module&quot; src=&quot;http://localhost/build/assets/app-BaqHKurI.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
     window.addEventListener(&#039;load&#039;, () =&gt; window.setTimeout(() =&gt; {
        const makeLink = (asset) =&gt; {
            const link = document.createElement(&#039;link&#039;)

            Object.keys(asset).forEach((attribute) =&gt; {
                link.setAttribute(attribute, asset[attribute])
            })

            return link
        }

        const loadNext = (assets, count) =&gt; window.setTimeout(() =&gt; {
            if (count &gt; assets.length) {
                count = assets.length

                if (count === 0) {
                    return
                }
            }

            const fragment = new DocumentFragment

            while (count &gt; 0) {
                const link = makeLink(assets.shift())
                fragment.append(link)
                count--

                if (assets.length) {
                    link.onload = () =&gt; loadNext(assets, 1)
                    link.onerror = () =&gt; loadNext(assets, 1)
                }
            }

            document.head.append(fragment)
        })

        loadNext(JSON.parse(&#039;[{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/ConfirmPassword-DPv-hhms.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/ForgotPassword-BC6Y4z63.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/Login-Bn22npEE.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/Register-CrKCUkWV.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/ResetPassword-eVw-SW9q.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/VerifyEmail-BLoSLJSw.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/Dashboard-C_2yt3c8.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/AuthenticatedLayout-CboUUh66.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/ApplicationLogo-DSUS-g3c.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/transition-BzU1cnQZ.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/Edit-BwfxVZ5F.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/DeleteUserForm-Bc3RPT1I.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/UpdatePasswordForm-D7PfkTqz.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/UpdateProfileInformationForm-CjIDtz3j.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/Welcome-CpXTyGwC.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/TextInput-BgoquPUt.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/InputLabel-Do0cT8GP.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/PrimaryButton-Bt-YWkQT.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/GuestLayout-aI9uCCHb.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022}]&#039;), 3)
    }))
&lt;/script&gt;            &lt;/head&gt;
    &lt;body class=&quot;font-sans antialiased&quot;&gt;
        &lt;div id=&quot;app&quot; data-page=&quot;{&amp;quot;component&amp;quot;:&amp;quot;Auth\/Register&amp;quot;,&amp;quot;props&amp;quot;:{&amp;quot;errors&amp;quot;:{},&amp;quot;auth&amp;quot;:{&amp;quot;user&amp;quot;:null}},&amp;quot;url&amp;quot;:&amp;quot;\/register&amp;quot;,&amp;quot;version&amp;quot;:&amp;quot;d69f32664db00068d06607eca78239c4&amp;quot;,&amp;quot;clearHistory&amp;quot;:false,&amp;quot;encryptHistory&amp;quot;:false}&quot;&gt;&lt;/div&gt;    &lt;/body&gt;
&lt;/html&gt;
</code>
 </pre>
    </span>
<span id="execution-results-GETregister" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETregister"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETregister"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETregister" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETregister">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETregister" data-method="GET"
      data-path="register"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETregister', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETregister"
                    onclick="tryItOut('GETregister');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETregister"
                    onclick="cancelTryOut('GETregister');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETregister"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>register</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETregister"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETregister"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTregister">Handle an incoming registration request.</h2>

<p>
</p>



<span id="example-requests-POSTregister">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://localhost/register" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"name\": \"b\",
    \"password\": \"architecto\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://localhost/register"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "name": "b",
    "password": "architecto"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTregister">
</span>
<span id="execution-results-POSTregister" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTregister"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTregister"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTregister" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTregister">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTregister" data-method="POST"
      data-path="register"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTregister', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTregister"
                    onclick="tryItOut('POSTregister');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTregister"
                    onclick="cancelTryOut('POSTregister');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTregister"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>register</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTregister"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTregister"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>name</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="name"                data-endpoint="POSTregister"
               value="b"
               data-component="body">
    <br>
<p>Must not be greater than 255 characters. Example: <code>b</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>email</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
<i>optional</i> &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="email"                data-endpoint="POSTregister"
               value=""
               data-component="body">
    <br>

        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="password"                data-endpoint="POSTregister"
               value="architecto"
               data-component="body">
    <br>
<p>Example: <code>architecto</code></p>
        </div>
        </form>

                    <h2 id="endpoints-GETlogin">Display the login view.</h2>

<p>
</p>



<span id="example-requests-GETlogin">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request GET \
    --get "http://localhost/login" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json"</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://localhost/login"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};


fetch(url, {
    method: "GET",
    headers,
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-GETlogin">
            <blockquote>
            <p>Example response (200):</p>
        </blockquote>
                <details class="annotation">
            <summary style="cursor: pointer;">
                <small onclick="textContent = parentElement.parentElement.open ? 'Show headers' : 'Hide headers'">Show headers</small>
            </summary>
            <pre><code class="language-http">cache-control: no-cache, private
content-type: application/json
link: &lt;http://localhost/build/assets/app-Dukl0do2.css&gt;; rel=&quot;preload&quot;; as=&quot;style&quot;, &lt;http://localhost/build/assets/app-BaqHKurI.js&gt;; rel=&quot;modulepreload&quot;; as=&quot;script&quot;
vary: X-Inertia
set-cookie: XSRF-TOKEN=eyJpdiI6IjFyTjVRY1Ztc0tIWW5jNmlDcDBUVXc9PSIsInZhbHVlIjoiODcxQ0RveVRDTE56UnY0VUI3cWxNeUswS3Fua3IyVTI2UktacXNzODF4MFdLdUZYL1FxbVd2VlVraTZTcFhVd2k1VXE4VlFjQXdlQlUrT3p1ZjRUa0lBdGMrOUNFNTM1VU9lanU4RmpEbEVWeW5yU2hwRXdXSkJrMDNqWnlTVGciLCJtYWMiOiI4MjdiMjIxNjE2YTZhOTE3NDJmMDhhZjAxZGI4MzYxZDU0Y2UwNWM1YmZhMzdlOWRkMWU2MDcxZTEyZDg2NzgyIiwidGFnIjoiIn0%3D; expires=Wed, 22 Jul 2026 15:04:36 GMT; Max-Age=7200; path=/; samesite=lax; laravel-session=eyJpdiI6Imt0ZUFZSjYxbnVkdFAvOFJDTmxCNWc9PSIsInZhbHVlIjoiaTRTTFlTM1VvZm8rdUxrZXRQcDdVdlc4RHlCNnN4alhxUUtpZVBsd1ZnRjZYVlAraVd6MGpUWHVIcXdrVzRMRllXcVVITGE3T2M3ay9jNGltcVhBRUZrdk8weXVyTTNUMGJ4ZHhjWFdQc0loVkN2VWVVSDZxWkdQc0tZNDVMa1oiLCJtYWMiOiI3ZTExZGU1YjU0Nzg2YTMzZjViYjJlMDhiNjVjNmVhNmNlOTEyMTllNWFmOGZmYTQ3OTQyYjFhYzRhZGY4ZWJiIiwidGFnIjoiIn0%3D; expires=Wed, 22 Jul 2026 15:04:36 GMT; Max-Age=7200; path=/; httponly; samesite=lax
 </code></pre></details>         <pre>

<code class="language-json" style="max-height: 300px;">&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;utf-8&quot;&gt;
        &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;

        &lt;title inertia&gt;Laravel&lt;/title&gt;

        &lt;!-- Fonts --&gt;
        &lt;link rel=&quot;preconnect&quot; href=&quot;https://fonts.googleapis.com&quot;&gt;
        &lt;link rel=&quot;preconnect&quot; href=&quot;https://fonts.gstatic.com&quot; crossorigin&gt;
        &lt;link href=&quot;https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&amp;family=Inter:wght@400;500;600&amp;family=JetBrains+Mono:wght@400;500&amp;display=swap&quot; rel=&quot;stylesheet&quot;&gt;
        &lt;link href=&quot;https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap&quot; rel=&quot;stylesheet&quot;&gt;

        &lt;!-- Scripts --&gt;
        &lt;script type=&quot;text/javascript&quot;&gt;Object.assign(Ziggy.routes,{&quot;debugbar.openhandler&quot;:{&quot;uri&quot;:&quot;_debugbar\/open&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;debugbar.cache.delete&quot;:{&quot;uri&quot;:&quot;_debugbar\/cache\/{key}&quot;,&quot;methods&quot;:[&quot;DELETE&quot;],&quot;wheres&quot;:{&quot;key&quot;:&quot;.*&quot;},&quot;parameters&quot;:[&quot;key&quot;]},&quot;debugbar.queries.explain&quot;:{&quot;uri&quot;:&quot;_debugbar\/queries\/explain&quot;,&quot;methods&quot;:[&quot;POST&quot;]},&quot;debugbar.clockwork&quot;:{&quot;uri&quot;:&quot;_debugbar\/clockwork\/{id}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;parameters&quot;:[&quot;id&quot;]},&quot;debugbar.assets&quot;:{&quot;uri&quot;:&quot;_debugbar\/assets&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;debugbar.telescope&quot;:{&quot;uri&quot;:&quot;_debugbar\/telescope\/{id}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;parameters&quot;:[&quot;id&quot;]},&quot;scribe&quot;:{&quot;uri&quot;:&quot;docs&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;scribe.postman&quot;:{&quot;uri&quot;:&quot;docs.postman&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;scribe.openapi&quot;:{&quot;uri&quot;:&quot;docs.openapi&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;sanctum.csrf-cookie&quot;:{&quot;uri&quot;:&quot;sanctum\/csrf-cookie&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;telescope&quot;:{&quot;uri&quot;:&quot;telescope\/{view?}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;wheres&quot;:{&quot;view&quot;:&quot;(.*)&quot;},&quot;parameters&quot;:[&quot;view&quot;]},&quot;jobs.show&quot;:{&quot;uri&quot;:&quot;jobs\/{job}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;parameters&quot;:[&quot;job&quot;],&quot;bindings&quot;:{&quot;job&quot;:&quot;id&quot;}},&quot;dashboard&quot;:{&quot;uri&quot;:&quot;dashboard&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;jobs.index&quot;:{&quot;uri&quot;:&quot;jobs&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;profile.edit&quot;:{&quot;uri&quot;:&quot;profile&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;profile.update&quot;:{&quot;uri&quot;:&quot;profile&quot;,&quot;methods&quot;:[&quot;PATCH&quot;]},&quot;profile.destroy&quot;:{&quot;uri&quot;:&quot;profile&quot;,&quot;methods&quot;:[&quot;DELETE&quot;]},&quot;admin.users.index&quot;:{&quot;uri&quot;:&quot;admin\/users&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;admin.users.create&quot;:{&quot;uri&quot;:&quot;admin\/users\/create&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;admin.users.store&quot;:{&quot;uri&quot;:&quot;admin\/users&quot;,&quot;methods&quot;:[&quot;POST&quot;]},&quot;admin.users.update&quot;:{&quot;uri&quot;:&quot;admin\/users\/{id}&quot;,&quot;methods&quot;:[&quot;PUT&quot;],&quot;parameters&quot;:[&quot;id&quot;]},&quot;admin.users.destroy&quot;:{&quot;uri&quot;:&quot;admin\/users\/{id}&quot;,&quot;methods&quot;:[&quot;DELETE&quot;],&quot;parameters&quot;:[&quot;id&quot;]},&quot;admin.users.changeRole&quot;:{&quot;uri&quot;:&quot;admin\/users\/{id}\/changeRole&quot;,&quot;methods&quot;:[&quot;PATCH&quot;],&quot;parameters&quot;:[&quot;id&quot;]},&quot;admin.jobs.destroy&quot;:{&quot;uri&quot;:&quot;admin\/jobs\/{id}&quot;,&quot;methods&quot;:[&quot;DELETE&quot;],&quot;parameters&quot;:[&quot;id&quot;]},&quot;register&quot;:{&quot;uri&quot;:&quot;register&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;login&quot;:{&quot;uri&quot;:&quot;login&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;password.request&quot;:{&quot;uri&quot;:&quot;forgot-password&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;password.email&quot;:{&quot;uri&quot;:&quot;forgot-password&quot;,&quot;methods&quot;:[&quot;POST&quot;]},&quot;password.reset&quot;:{&quot;uri&quot;:&quot;reset-password\/{token}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;parameters&quot;:[&quot;token&quot;]},&quot;password.store&quot;:{&quot;uri&quot;:&quot;reset-password&quot;,&quot;methods&quot;:[&quot;POST&quot;]},&quot;verification.notice&quot;:{&quot;uri&quot;:&quot;verify-email&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;verification.verify&quot;:{&quot;uri&quot;:&quot;verify-email\/{id}\/{hash}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;parameters&quot;:[&quot;id&quot;,&quot;hash&quot;]},&quot;verification.send&quot;:{&quot;uri&quot;:&quot;email\/verification-notification&quot;,&quot;methods&quot;:[&quot;POST&quot;]},&quot;password.confirm&quot;:{&quot;uri&quot;:&quot;confirm-password&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;]},&quot;password.update&quot;:{&quot;uri&quot;:&quot;password&quot;,&quot;methods&quot;:[&quot;PUT&quot;]},&quot;logout&quot;:{&quot;uri&quot;:&quot;logout&quot;,&quot;methods&quot;:[&quot;POST&quot;]},&quot;storage.local&quot;:{&quot;uri&quot;:&quot;storage\/{path}&quot;,&quot;methods&quot;:[&quot;GET&quot;,&quot;HEAD&quot;],&quot;wheres&quot;:{&quot;path&quot;:&quot;.*&quot;},&quot;parameters&quot;:[&quot;path&quot;]},&quot;storage.local.upload&quot;:{&quot;uri&quot;:&quot;storage\/{path}&quot;,&quot;methods&quot;:[&quot;PUT&quot;],&quot;wheres&quot;:{&quot;path&quot;:&quot;.*&quot;},&quot;parameters&quot;:[&quot;path&quot;]}});&lt;/script&gt;                &lt;link rel=&quot;preload&quot; as=&quot;style&quot; href=&quot;http://localhost/build/assets/app-Dukl0do2.css&quot; /&gt;&lt;link rel=&quot;modulepreload&quot; as=&quot;script&quot; href=&quot;http://localhost/build/assets/app-BaqHKurI.js&quot; /&gt;&lt;link rel=&quot;stylesheet&quot; href=&quot;http://localhost/build/assets/app-Dukl0do2.css&quot; /&gt;&lt;script type=&quot;module&quot; src=&quot;http://localhost/build/assets/app-BaqHKurI.js&quot;&gt;&lt;/script&gt;
&lt;script&gt;
     window.addEventListener(&#039;load&#039;, () =&gt; window.setTimeout(() =&gt; {
        const makeLink = (asset) =&gt; {
            const link = document.createElement(&#039;link&#039;)

            Object.keys(asset).forEach((attribute) =&gt; {
                link.setAttribute(attribute, asset[attribute])
            })

            return link
        }

        const loadNext = (assets, count) =&gt; window.setTimeout(() =&gt; {
            if (count &gt; assets.length) {
                count = assets.length

                if (count === 0) {
                    return
                }
            }

            const fragment = new DocumentFragment

            while (count &gt; 0) {
                const link = makeLink(assets.shift())
                fragment.append(link)
                count--

                if (assets.length) {
                    link.onload = () =&gt; loadNext(assets, 1)
                    link.onerror = () =&gt; loadNext(assets, 1)
                }
            }

            document.head.append(fragment)
        })

        loadNext(JSON.parse(&#039;[{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/ConfirmPassword-DPv-hhms.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/ForgotPassword-BC6Y4z63.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/Login-Bn22npEE.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/Register-CrKCUkWV.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/ResetPassword-eVw-SW9q.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/VerifyEmail-BLoSLJSw.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/Dashboard-C_2yt3c8.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/AuthenticatedLayout-CboUUh66.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/ApplicationLogo-DSUS-g3c.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/transition-BzU1cnQZ.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/Edit-BwfxVZ5F.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/DeleteUserForm-Bc3RPT1I.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/UpdatePasswordForm-D7PfkTqz.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/UpdateProfileInformationForm-CjIDtz3j.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/Welcome-CpXTyGwC.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/TextInput-BgoquPUt.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/InputLabel-Do0cT8GP.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/PrimaryButton-Bt-YWkQT.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022},{\u0022rel\u0022:\u0022prefetch\u0022,\u0022as\u0022:\u0022script\u0022,\u0022href\u0022:\u0022http:\\\/\\\/localhost\\\/build\\\/assets\\\/GuestLayout-aI9uCCHb.js\u0022,\u0022fetchpriority\u0022:\u0022low\u0022}]&#039;), 3)
    }))
&lt;/script&gt;            &lt;/head&gt;
    &lt;body class=&quot;font-sans antialiased&quot;&gt;
        &lt;div id=&quot;app&quot; data-page=&quot;{&amp;quot;component&amp;quot;:&amp;quot;Auth\/Login&amp;quot;,&amp;quot;props&amp;quot;:{&amp;quot;errors&amp;quot;:{},&amp;quot;auth&amp;quot;:{&amp;quot;user&amp;quot;:null},&amp;quot;canResetPassword&amp;quot;:true,&amp;quot;status&amp;quot;:null},&amp;quot;url&amp;quot;:&amp;quot;\/login&amp;quot;,&amp;quot;version&amp;quot;:&amp;quot;d69f32664db00068d06607eca78239c4&amp;quot;,&amp;quot;clearHistory&amp;quot;:false,&amp;quot;encryptHistory&amp;quot;:false}&quot;&gt;&lt;/div&gt;    &lt;/body&gt;
&lt;/html&gt;
</code>
 </pre>
    </span>
<span id="execution-results-GETlogin" hidden>
    <blockquote>Received response<span
                id="execution-response-status-GETlogin"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-GETlogin"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-GETlogin" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-GETlogin">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-GETlogin" data-method="GET"
      data-path="login"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('GETlogin', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-GETlogin"
                    onclick="tryItOut('GETlogin');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-GETlogin"
                    onclick="cancelTryOut('GETlogin');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-GETlogin"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-green">GET</small>
            <b><code>login</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="GETlogin"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="GETlogin"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                        </form>

                    <h2 id="endpoints-POSTlogin">Handle an incoming authentication request.</h2>

<p>
</p>



<span id="example-requests-POSTlogin">
<blockquote>Example request:</blockquote>


<div class="bash-example">
    <pre><code class="language-bash">curl --request POST \
    "http://localhost/login" \
    --header "Content-Type: application/json" \
    --header "Accept: application/json" \
    --data "{
    \"email\": \"gbailey@example.net\",
    \"password\": \"|]|{+-\"
}"
</code></pre></div>


<div class="javascript-example">
    <pre><code class="language-javascript">const url = new URL(
    "http://localhost/login"
);

const headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
};

let body = {
    "email": "gbailey@example.net",
    "password": "|]|{+-"
};

fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
}).then(response =&gt; response.json());</code></pre></div>

</span>

<span id="example-responses-POSTlogin">
</span>
<span id="execution-results-POSTlogin" hidden>
    <blockquote>Received response<span
                id="execution-response-status-POSTlogin"></span>:
    </blockquote>
    <pre class="json"><code id="execution-response-content-POSTlogin"
      data-empty-response-text="<Empty response>" style="max-height: 400px;"></code></pre>
</span>
<span id="execution-error-POSTlogin" hidden>
    <blockquote>Request failed with error:</blockquote>
    <pre><code id="execution-error-message-POSTlogin">

Tip: Check that you&#039;re properly connected to the network.
If you&#039;re a maintainer of ths API, verify that your API is running and you&#039;ve enabled CORS.
You can check the Dev Tools console for debugging information.</code></pre>
</span>
<form id="form-POSTlogin" data-method="POST"
      data-path="login"
      data-authed="0"
      data-hasfiles="0"
      data-isarraybody="0"
      autocomplete="off"
      onsubmit="event.preventDefault(); executeTryOut('POSTlogin', this);">
    <h3>
        Request&nbsp;&nbsp;&nbsp;
                    <button type="button"
                    style="background-color: #8fbcd4; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-tryout-POSTlogin"
                    onclick="tryItOut('POSTlogin');">Try it out ⚡
            </button>
            <button type="button"
                    style="background-color: #c97a7e; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-canceltryout-POSTlogin"
                    onclick="cancelTryOut('POSTlogin');" hidden>Cancel 🛑
            </button>&nbsp;&nbsp;
            <button type="submit"
                    style="background-color: #6ac174; padding: 5px 10px; border-radius: 5px; border-width: thin;"
                    id="btn-executetryout-POSTlogin"
                    data-initial-text="Send Request 💥"
                    data-loading-text="⏱ Sending..."
                    hidden>Send Request 💥
            </button>
            </h3>
            <p>
            <small class="badge badge-black">POST</small>
            <b><code>login</code></b>
        </p>
                <h4 class="fancy-heading-panel"><b>Headers</b></h4>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Content-Type</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Content-Type"                data-endpoint="POSTlogin"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <div style="padding-left: 28px; clear: unset;">
                <b style="line-height: 2;"><code>Accept</code></b>&nbsp;&nbsp;
&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="Accept"                data-endpoint="POSTlogin"
               value="application/json"
               data-component="header">
    <br>
<p>Example: <code>application/json</code></p>
            </div>
                                <h4 class="fancy-heading-panel"><b>Body Parameters</b></h4>
        <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>email</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="email"                data-endpoint="POSTlogin"
               value="gbailey@example.net"
               data-component="body">
    <br>
<p>Must be a valid email address. Example: <code>gbailey@example.net</code></p>
        </div>
                <div style=" padding-left: 28px;  clear: unset;">
            <b style="line-height: 2;"><code>password</code></b>&nbsp;&nbsp;
<small>string</small>&nbsp;
 &nbsp;
 &nbsp;
                <input type="text" style="display: none"
                              name="password"                data-endpoint="POSTlogin"
               value="|]|{+-"
               data-component="body">
    <br>
<p>Example: <code>|]|{+-</code></p>
        </div>
        </form>

            

        
    </div>
    <div class="dark-box">
                    <div class="lang-selector">
                                                        <button type="button" class="lang-button" data-language-name="bash">bash</button>
                                                        <button type="button" class="lang-button" data-language-name="javascript">javascript</button>
                            </div>
            </div>
</div>
</body>
</html>
