using Microsoft.SqlServer.Server;
using System;
using System.Data.SqlTypes;
using System.IO;
using System.Linq;
public class fileIO
{
  [SqlFunction]
  public static SqlString FileCopy(
          SqlString SourceFileName,
          SqlString DestFileName,
          SqlBoolean Overwrite)
  {
    try
    {
      // input parameters must not be NULL
      if (!SourceFileName.IsNull &&
          !DestFileName.IsNull &&
          !Overwrite.IsNull)
      {
        // perform copy operation
        File.Copy(SourceFileName.Value,
                  DestFileName.Value,
                  Overwrite.Value);                
        // return success message
        return "Operation completed successfully.";
      }
      else
      {
        // error if any input parameter is NULL
        return "Error: NULL input parameter.";
      }   
    }
    catch (Exception ex)
    {
      // return any unhandled error message
      return ex.Message;
    }
  }
  [SqlFunction]
  public static SqlString FileDelete(
          SqlString Path)
  {
    try
    {
      // input parameter must not be NULL
      if (!Path.IsNull)
      {
        // perform delete operation
        File.Delete(Path.Value);
        
        // return success message
        return "Operation completed successfully.";
      }
      else
      {
        // error if any input parameter is NULL
        return "Error: NULL input parameter.";
      } 
    }
    catch (Exception ex)
    {
      // return any unhandled error message
      return ex.Message;
    }
  }
  [SqlFunction]
  public static SqlString FileDeleteMatch(
          SqlString DirectoryPath,
          SqlString SearchPattern,
          SqlBoolean Subdirectories,
          SqlBoolean Match)
  {
    try
    {
      // input parameters must not be NULL
      if (!DirectoryPath.IsNull &&
          !SearchPattern.IsNull &&
          !Subdirectories.IsNull &&
          !Match.IsNull)
      {
        // if Subdirectories parameter is true, search subdirectories
        var DirectoryOption = Subdirectories.Value == true ? SearchOption.AllDirectories : SearchOption.TopDirectoryOnly;
        if (!Match.Value)
          {
            // wildcard match found
            foreach (string FileFound in 
                            Directory.GetFiles(DirectoryPath.Value,
                            SearchPattern.Value,
                            DirectoryOption))
            {
              // perform delete operation
              File.Delete(FileFound);
            }
          }
        else
          {
            // wildcard match not found, use Except to get unmatched files
            foreach (string FileFound in
                            Directory.GetFiles(DirectoryPath.Value,
                            "*",
                            DirectoryOption).Except(
                                        Directory.GetFiles(DirectoryPath.Value,
                                        SearchPattern.Value,
                                        DirectoryOption)))
            {
              // perform delete operation
              File.Delete(FileFound);
            }
          }
        // return success message
        return "Operation completed successfully.";
      }
      else
      {
        // error if any input parameter is NULL
        return "Error: NULL input parameter.";
      }  
    }
    catch (Exception ex)
    {
      // return any unhandled error message
      return ex.Message;
    }
  }
  [SqlFunction]
  public static SqlString FileMove(
          SqlString SourceFileName,
          SqlString DestFileName)
  {
    try
    {
      // input parameters must not be NULL
      if (!SourceFileName.IsNull &&
          !DestFileName.IsNull)
      {
        // perform move operation
        File.Move(SourceFileName.Value,
                  DestFileName.Value); 
        // return success message
        return "Operation completed successfully.";
      }
      else
      {
        // error if any input parameter is NULL
        return "Error: NULL input parameter.";
      }  
    }
    catch (Exception ex)
    {
      // return any unhandled error message
      return ex.Message;
    }
  }
  [SqlFunction]
  public static SqlString FileReplace(
          SqlString SourceFileName,
          SqlString DestFileName,
          SqlString BackupFileName,
          SqlBoolean IgnoreMetadataErrors)
  {
    try
    {
      // input parameters must not be NULL
      if (!SourceFileName.IsNull &&
          !DestFileName.IsNull &&
          !BackupFileName.IsNull &&
          !IgnoreMetadataErrors.IsNull)
      {
        // perform replace operation
        new FileInfo(SourceFileName.Value).Replace(DestFileName.Value,
                                                  BackupFileName.Value,
                                                  IgnoreMetadataErrors.Value);
                                                
        // return success message
        return "Operation completed successfully.";
      }
      else
      { 
        // error if any input parameter is NULL
        return "Error: NULL input parameter.";
      }
    }
    catch (Exception ex)
    {
      // return any unhandled error message
      return ex.Message;
    }
  }
};