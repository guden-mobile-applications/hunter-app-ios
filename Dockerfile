FROM nginx:alpine

# Nginx'in varsayılan dosyalarını temizleyelim ki seninkilerle karışmasın
RUN rm -rf /usr/share/nginx/html/*

# Eğer index.html ana dizindeyse '.' kalsın, 
# ama bir klasördeyse './klasor_adi' yapmalısın.
COPY . /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]