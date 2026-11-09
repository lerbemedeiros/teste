import { getAccessToken } from './googleAuth';

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  webContentLink?: string;
  thumbnailLink?: string;
  iconLink?: string;
  createdTime?: string;
  modifiedTime?: string;
  size?: string;
  starred?: boolean;
  parents?: string[];
  owners?: Array<{
    displayName: string;
    emailAddress: string;
    photoLink?: string;
  }>;
}

export interface DriveStorageQuota {
  limit?: string;
  usage?: string;
  usageInDrive?: string;
  usageInDriveTrash?: string;
}

export interface DriveUserInfo {
  displayName: string;
  emailAddress: string;
  photoLink?: string;
}

export interface DriveAboutResponse {
  user: DriveUserInfo;
  storageQuota: DriveStorageQuota;
}

// Helper to format file size in human-readable string
export const formatFileSize = (bytes?: string | number): string => {
  if (!bytes) return '—';
  const num = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes;
  if (isNaN(num) || num <= 0) return '—';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;
  let size = num;
  while (size >= 1024 && i < units.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
};

// Check if a file is a folder
export const isFolder = (mimeType: string): boolean => {
  return mimeType === 'application/vnd.google-apps.folder';
};

// Get clean category/type description and icon color
export const getMimeTypeInfo = (mimeType: string) => {
  if (isFolder(mimeType)) {
    return { label: 'Pasta', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/40', badge: 'Pasta' };
  }
  if (mimeType.includes('pdf')) {
    return { label: 'PDF', color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/40', badge: 'PDF' };
  }
  if (mimeType.includes('spreadsheet') || mimeType.includes('excel') || mimeType.includes('csv')) {
    return { label: 'Planilha', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/40', badge: 'Sheets' };
  }
  if (mimeType.includes('document') || mimeType.includes('word')) {
    return { label: 'Documento', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/40', badge: 'Docs' };
  }
  if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) {
    return { label: 'Apresentação', color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-950/40', badge: 'Slides' };
  }
  if (mimeType.includes('image/')) {
    return { label: 'Imagem', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/40', badge: 'Imagem' };
  }
  if (mimeType.includes('video/')) {
    return { label: 'Vídeo', color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-950/40', badge: 'Vídeo' };
  }
  return { label: 'Arquivo', color: 'text-neutral-500', bg: 'bg-neutral-100 dark:bg-neutral-800', badge: 'Arquivo' };
};

// 1. Get Storage Quota and User Info from Google Drive
export const getDriveAbout = async (): Promise<DriveAboutResponse> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Não autenticado. Por favor, conecte sua conta Google.');

  const res = await fetch('https://www.googleapis.com/drive/v3/about?fields=user,storageQuota', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Erro ao obter informações do Google Drive: ${errorText}`);
  }

  return await res.json();
};

// 2. List Files and Folders
export const listDriveFiles = async (
  options: {
    folderId?: string;
    searchQuery?: string;
    mimeTypeFilter?: string;
    pageSize?: number;
    pageToken?: string;
  } = {}
): Promise<{ files: DriveFileItem[]; nextPageToken?: string }> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Não autenticado. Por favor, conecte sua conta Google.');

  const { folderId, searchQuery, mimeTypeFilter, pageSize = 40, pageToken } = options;

  const queries: string[] = ['trashed = false'];

  if (folderId && folderId !== 'root') {
    queries.push(`'${folderId}' in parents`);
  } else if (!searchQuery && !mimeTypeFilter) {
    // If at root and not searching across all Drive, show root files
    queries.push(`'root' in parents`);
  }

  if (searchQuery && searchQuery.trim().length > 0) {
    // Escape single quotes in search query
    const cleanSearch = searchQuery.replace(/'/g, "\\'");
    queries.push(`name contains '${cleanSearch}'`);
  }

  if (mimeTypeFilter && mimeTypeFilter !== 'all') {
    if (mimeTypeFilter === 'folder') {
      queries.push(`mimeType = 'application/vnd.google-apps.folder'`);
    } else if (mimeTypeFilter === 'pdf') {
      queries.push(`mimeType = 'application/pdf'`);
    } else if (mimeTypeFilter === 'docs') {
      queries.push(`mimeType contains 'document' or mimeType contains 'word'`);
    } else if (mimeTypeFilter === 'sheets') {
      queries.push(`mimeType contains 'spreadsheet' or mimeType contains 'excel' or mimeType = 'text/csv'`);
    } else if (mimeTypeFilter === 'slides') {
      queries.push(`mimeType contains 'presentation' or mimeType contains 'powerpoint'`);
    } else if (mimeTypeFilter === 'images') {
      queries.push(`mimeType contains 'image/'`);
    }
  }

  const q = queries.join(' and ');
  const fields = 'nextPageToken, files(id, name, mimeType, iconLink, webViewLink, webContentLink, thumbnailLink, createdTime, modifiedTime, size, starred, parents, owners)';

  const params = new URLSearchParams({
    q,
    fields,
    pageSize: pageSize.toString(),
    orderBy: 'folder, modifiedTime desc',
  });

  if (pageToken) {
    params.set('pageToken', pageToken);
  }

  const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Falha ao carregar arquivos do Google Drive: ${errorText}`);
  }

  return await res.json();
};

// 3. Create a New Folder
export const createDriveFolder = async (name: string, parentFolderId?: string): Promise<DriveFileItem> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Não autenticado. Por favor, conecte sua conta Google.');

  const metadata: any = {
    name,
    mimeType: 'application/vnd.google-apps.folder',
  };

  if (parentFolderId && parentFolderId !== 'root') {
    metadata.parents = [parentFolderId];
  }

  const res = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Falha ao criar pasta no Google Drive: ${errorText}`);
  }

  return await res.json();
};

// 4. Upload a File to Google Drive
export const uploadFileToDrive = async (
  file: File,
  parentFolderId?: string,
  onProgress?: (progressPercent: number) => void
): Promise<DriveFileItem> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Não autenticado. Por favor, conecte sua conta Google.');

  const metadata: any = {
    name: file.name,
    mimeType: file.type || 'application/octet-stream',
  };

  if (parentFolderId && parentFolderId !== 'root') {
    metadata.parents = [parentFolderId];
  }

  // Create multipart boundary
  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = async () => {
      try {
        const fileContent = reader.result;
        const multipartRequestBody = new Blob([
          delimiter,
          'Content-Type: application/json\r\n\r\n',
          JSON.stringify(metadata),
          delimiter,
          `Content-Type: ${file.type || 'application/octet-stream'}\r\n\r\n`,
          fileContent as ArrayBuffer,
          closeDelimiter,
        ]);

        const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink,size,createdTime', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': `multipart/related; boundary=${boundary}`,
          },
          body: multipartRequestBody,
        });

        if (!res.ok) {
          const err = await res.text();
          throw new Error(`Erro ao enviar arquivo para o Google Drive: ${err}`);
        }

        const uploadedItem = await res.json();
        resolve(uploadedItem);
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (e) => reject(new Error('Erro ao ler arquivo local para upload.'));
    reader.readAsArrayBuffer(file);
  });
};

// 5. Delete a File or Folder from Drive (User MUST confirm in UI before calling this!)
export const deleteDriveFile = async (fileId: string): Promise<boolean> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Não autenticado. Por favor, conecte sua conta Google.');

  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok && res.status !== 204) {
    const errorText = await res.text();
    throw new Error(`Erro ao excluir arquivo do Google Drive: ${errorText}`);
  }

  return true;
};
