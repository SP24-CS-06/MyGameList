import urllib.request, json, psycopg

appListUrl = "https://api.steampowered.com/ISteamApps/GetAppList/v2/";
detailsUrl = "http://store.steampowered.com/api/appdetails?appids=";

def insertApp(cur, appid, title, synopsis, imageUrl):
    try: 
        cur.execute("""
            INSERT INTO apps (appid, title, synopsis, image_url) 
            VALUES (%s, %s, %s, %s)
            """, (appid, title, synopsis, imageUrl))
        print("inserted " + title)
    except Exception as e:
        print("Error insertApp: " + str(e))

def getStoredApps(cur):
    apps = dict()
    cur.execute("SELECT appid FROM apps")
    
    for record in cur:
        apps[int(record[0])] = True
    return apps

def processApp(title, appId):
    with urllib.request.urlopen(detailsUrl + str(appId)) as detailsUrlResponse:
        appDetailsJson = json.load(detailsUrlResponse)
        appDetails = appDetailsJson[str(appId)]
        if "data" not in appDetails: return

        appData = appDetails["data"]
        imageUrl = appData["header_image"]
        synopsis = appData["short_description"]

        if imageUrl and synopsis: 
            insertApp(cur, appId, title, synopsis, imageUrl)

print("connecting to database...")
with psycopg.connect("dbname=postgres user=postgres password=password port=5005 host=localhost") as conn:
    conn.autocommit = True # save all insertions into database even if program crashes due to Error 429

with conn.cursor() as cur:
    storedApps = getStoredApps(cur)
    print("fetching all apps...") 
    with urllib.request.urlopen(appListUrl) as appList:
        appList = json.load(appList)
        for app in appList["applist"]["apps"]:
            title = app["name"]
            appId = app["appid"]
            if not title or appId in storedApps: continue
            processApp(title, appId)

conn.close()
                    
print("finished fetching and inserting all possible apps!")