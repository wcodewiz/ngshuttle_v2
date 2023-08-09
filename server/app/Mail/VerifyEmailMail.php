<?php

namespace App\Mail;

use App\Models\User;
use App\utils\ShopApp;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\HtmlString;

class VerifyEmailMail extends Mailable
{
    use Queueable, SerializesModels;

    private string $link;
    private User $user;
    private string $appName;


    /**
     * Create a new message instance.
     */
    public function __construct(User $user,string $link)
    {
        $this->link=$link;
        $this->user=$user;
        $this->appName=ShopApp::appName();
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "$this->appName Email Verification",
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $name=explode("@",$this->user->email)[0];

        return new Content(
            view: 'mail.mail',
            with:["subject"=>"$this->appName Email Verification",
            "body"=>new HtmlString("Hello $name, <br>
            <h4 style='text-align:center;width:100%;'>Verify your account</h4>. <hr/>
            <p>Your account email is yet to be verified!!</p><br>
            <article>This very few steps
            will help you,verify your account ,
            click the verify mail link to verify.
            <a  style='display:block;margin-top:14px;background-color:green;
            color:#fff;padding:5px 45px;text-decoration:none;border-radius:5px;'
            href='$this->link'>Verify Email</a></article>"),]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
