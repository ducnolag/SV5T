import urllib.request
import re
import json
import os

try:
    url = 'https://vi.wikipedia.org/wiki/Danh_s%C3%A1ch_tr%C6%B0%E1%BB%9Dng_%C4%91%E1%BA%A1i_h%E1%BB%8Dc,_h%E1%BB%8Dc_vi%E1%BB%87n_v%C3%A0_cao_%C4%91%E1%BA%B3ng_t%E1%BA%A1i_Vi%E1%BB%87t_Nam'
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    matches = re.findall(r'title="([^"]+)"><span', html)
    matches += re.findall(r'<td><a href="[^"]+" title="([^"]+)">', html)
    
    unis = []
    for m in matches:
        if 'Đại học' in m or 'Học viện' in m or 'Trường' in m:
            unis.append(m)
    
    unis = sorted(list(set(unis)))
    output_path = os.path.join('d:\\hackathon\\frontend-app\\public', 'vietnam_universities.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(unis, f, ensure_ascii=False)
    
    print(f"Saved {len(unis)} universities")
except Exception as e:
    print(e)
