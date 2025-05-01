local port=2565
local bindaddr="localhost" -- change to 0.0.0.0 for public access
ProgramPort(port)
ProgramAddr(bindaddr)
SetLogLevel(0)

-- special script called by main redbean process at startup
HidePath('/usr/share/zoneinfo/')
HidePath('/usr/share/ssl/')
-- LaunchBrowser('');

print("Accelon25 server started on http://"..bindaddr..":".. port)
print("press Ctrl key and click on the link to open in browser")
local re=require('re')
local ptkpath = re.compile[[([a-z\-]+)\.ptk@?([0-9a-z]*)$]]
local str=require('str')
local pitaka=require('pitaka')

function OnHttpRequest()
    local path = GetPath()
    _,fn,page=ptkpath:search(path)
    if page =="" or page==nil then page = "0"  end
    page = str.padStart(page,3,"0")
    print("path="..path)
    if path=="/ptks" then
        local filelist=pitaka.getList(fn)
        Write(table.concat(filelist, ","));
    else 
        if (not _ ) then
        Route()
        else
            local content=pitaka.getContent(fn,page)
            Write(content)
        end    
    end
    SetHeader('Content-Language', 'utf-8')
end