import urllib.request, json, psycopg

appListUrl = "https://api.steampowered.com/ISteamApps/GetAppList/v2/";
detailsUrl = "http://store.steampowered.com/api/appdetails?appids=";

# insert an individual app into database
def insertApp(cur, appid, title, synopsis, imageUrl):
    try: 
        cur.execute("""
            INSERT INTO apps (appid, title, synopsis, image_url) 
            VALUES (%s, %s, %s, %s)
            """, (appid, title, synopsis, imageUrl))
        print("inserted " + title)
    except Exception as e:
        print("Error insertApp: " + str(e))

# return a hashmap with all stored appids
def getStoredApps(cur):
    apps = dict()
    cur.execute("SELECT appid FROM apps")
    
    for record in cur:
        apps[int(record[0])] = True
    return apps

print("connecting to database...")
with psycopg.connect("dbname=postgres user=postgres password=password port=5005") as conn:
    conn.autocommit = True # save all insertions into database even if program crashes due to Error 429

    with conn.cursor() as cur:
        storedApps = getStoredApps(cur)

        print("fetching all apps...") 
        with urllib.request.urlopen(appListUrl) as appListUrlResponse:
            appList = json.load(appListUrlResponse)

            # fetch app details for every app
            for app in appList["applist"]["apps"]:
                title = app["name"]
                appid = app["appid"]

                if title and not appid in storedApps:
                    with urllib.request.urlopen(detailsUrl + str(appid)) as detailsUrlResponse:
                        appDetailsJson = json.load(detailsUrlResponse)
                        appDetails = appDetailsJson[str(appid)]

                        if "data" in appDetails:
                            appDetailsData = appDetails["data"]

                            imageUrl = appDetailsData["header_image"]
                            synopsis = appDetailsData["short_description"]

                            if imageUrl and synopsis:
                                insertApp(cur, appid, title, synopsis, imageUrl)
                        
print("finished fetching and inserting all possible apps!")