module Paperclip
  class Cropper < Thumbnail
    def transformation_command
      if crop_command
        puts crop_command
        crop_command #+ super.first.sub(/ -crop \S+/, '')
      else
        super
      end
    end

    def crop_command
      target = @attachment.instance
      if target.cropping?
        puts 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

        puts " -crop '#{target.crop_w.to_i}x#{target.crop_h.to_i}+#{target.crop_x.to_i}+#{target.crop_y.to_i}'"
        " -crop '#{target.crop_w.to_i}x#{target.crop_h.to_i}+#{target.crop_x.to_i}+#{target.crop_y.to_i}'"
      end
    end
  end

end