Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = WshShell.CurrentDirectory & "\hsc\"
WshShell.Run chr(34) & "start.bat" & Chr(34), 0
Set WshShell = Nothing