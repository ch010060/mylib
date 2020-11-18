
/* Replace string with string */
int replace_str(char* pchrsource,char* pchrfind,char* pchrrep)
{
  char pchrresult[2000];
  char* pchrformer;
  char* pchrlocation;
  int intrep;
  int intfind;
  int intlength;
  int intgap=0;

  intfind=strlen(pchrfind);
  intrep=strlen(pchrrep);
  intlength=strlen(pchrsource)+1;

  strcpy(pchrresult, pchrsource);

  pchrformer=pchrsource;
  pchrlocation= strstr(pchrformer, pchrfind);

  while(pchrlocation!=NULL){

  intgap+=(pchrlocation - pchrformer);
  pchrresult[intgap]='\0';

  intlength+=(intrep-intfind);
  strcat(pchrresult, pchrrep);
  intgap+=intrep;


  pchrformer=pchrlocation+intfind;

  strcat(pchrresult, pchrformer);


  pchrlocation= strstr(pchrformer, pchrfind);
}

  pchrresult[strlen(pchrresult)]='\0';
  strcpy(pchrsource,pchrresult);
  return 0;
}

/* replace all occurances of "from" in a string with "to" */
static void replace_char(char *string, char from, char to, int maxlen)
{
        char *lastchar = string + maxlen;
        while (string) {
                string = strchr(string, from);
                if (string) {
                        *string = to;
                        if (string >= lastchar)
                                return;
                }
        }
}

/* Concat string at front */
char* strcat_front(const char *str_src,const char *str_insert){
   char tmp_src[1024];
   static char buffer[1024];
   
   strcpy(tmp_src, str_src);
   strcpy(buffer, str_insert);
   strcat(buffer, tmp_src);
   buffer[strlen(buffer)] = '\0';
   
   return buffer;
}

/* Compare with tail string */
int EndsWith(const char *str, const char *suffix)
{
    if (!str || !suffix || !strcmp(suffix,""))
        return 0;
    size_t lenstr = strlen(str);
    size_t lensuffix = strlen(suffix);
    if (lensuffix >  lenstr)
        return 0;
    return strncmp(str + lenstr - lensuffix, suffix, lensuffix) == 0;
}

/* Check a pointer to char size*/
int getSize(char* ch){
        int tmp = 0;
        while(*ch) {
                ch++;
                tmp++;
        }
        return tmp;
}

/* Check a pointer to char array size*/
int getSizeArray(char* ch[]){
        int tmp = 0;
        while(*ch) {
                ch++;
                tmp++;
        }
        return tmp;
}

char *splitByString(char *str, const char *delim)
{
    char *p = strstr(str, delim);

    if (p == NULL) return NULL;     // delimiter not found

    *p = '\0';                      // terminate string after head
    return p + strlen(delim);       // return tail substring
}

void BytesToSize(char* str, float Bytes){
             float tb = 1099511627776;
             float gb = 1073741824;
             float mb = 1048576;
             float kb = 1024;
             char returnSize[256];

             if( Bytes >= tb )
                 sprintf(returnSize, "%.2f TB", (float)Bytes/tb);
             else if( Bytes >= gb && Bytes < tb )
                 sprintf(returnSize, "%.2f GB", (float)Bytes/gb);
             else if( Bytes >= mb && Bytes < gb )
                 sprintf(returnSize, "%.2f MB", (float)Bytes/mb);
             else if( Bytes >= kb && Bytes < mb )
                 sprintf(returnSize, "%.2f KB", (float)Bytes/kb);
             else if ( Bytes < kb)
                 sprintf(returnSize, "%.2f Bytes", Bytes);
             else
                 sprintf(returnSize, "%.2f Bytes", Bytes);

             strcpy(str, returnSize);
             //return returnSize;
 }